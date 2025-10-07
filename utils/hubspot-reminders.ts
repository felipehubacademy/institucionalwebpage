/**
 * HubSpot utilities for fetching qualified attendees for reminders
 */

interface Deal {
  id: string
  properties: {
    dealname: string
    dealstage: string
    meetup_reminder_d7_sent?: string
    meetup_reminder_d3_sent?: string
    meetup_reminder_d1_sent?: string
    [key: string]: any
  }
}

interface Contact {
  id: string
  properties: {
    firstname: string
    lastname: string
    email: string
    phone: string
  }
}

/**
 * Fetch deals in "Presença confirmada" stage that need reminders
 */
export async function fetchQualifiedDeals(
  reminderType: 'd7' | 'd3' | 'd1',
  apiKey: string,
): Promise<Deal[]> {
  try {
    const pipelineId = '802447717' // MeetUP - Out/25
    const qualifiedStageId = '1178499145' // Presença confirmada

    const response = await fetch('https://api.hubapi.com/crm/v3/objects/deals/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'pipeline',
                operator: 'EQ',
                value: pipelineId,
              },
              {
                propertyName: 'dealstage',
                operator: 'EQ',
                value: qualifiedStageId,
              },
            ],
          },
        ],
        properties: [
          'dealname',
          'dealstage',
          'meetup_reminder_d7_sent',
          'meetup_reminder_d3_sent',
          'meetup_reminder_d1_sent',
        ],
        limit: 100,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('HubSpot search deals error:', JSON.stringify(errorData, null, 2))
      throw new Error(`Failed to search deals: ${errorData.message || response.statusText}`)
    }

    const data = await response.json()
    const deals: Deal[] = data.results || []

    // Filter deals that haven't received this specific reminder
    const propertyName = `meetup_reminder_${reminderType}_sent`
    const filteredDeals = deals.filter(deal => {
      const sentValue = deal.properties[propertyName]
      return !sentValue || sentValue === 'false' || sentValue === ''
    })

    console.log(`Found ${filteredDeals.length} deals needing ${reminderType} reminder`)
    return filteredDeals
  } catch (error) {
    console.error('Error fetching qualified deals:', error)
    throw error
  }
}

/**
 * Fetch contact associated with a deal
 */
export async function fetchContactFromDeal(dealId: string, apiKey: string): Promise<Contact | null> {
  try {
    // 1. Get contact associations
    const assocResponse = await fetch(
      `https://api.hubapi.com/crm/v4/objects/deals/${dealId}/associations/contacts`,
      {
        headers: { 'Authorization': `Bearer ${apiKey}` },
      }
    )

    if (!assocResponse.ok) {
      console.error(`Failed to fetch associations for deal ${dealId}`)
      return null
    }

    const assocData = await assocResponse.json()
    
    if (!assocData.results || assocData.results.length === 0) {
      console.warn(`No contact associated with deal ${dealId}`)
      return null
    }

    const contactId = assocData.results[0].toObjectId

    // 2. Get contact details
    const contactResponse = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}?properties=firstname,lastname,email,phone`,
      {
        headers: { 'Authorization': `Bearer ${apiKey}` },
      }
    )

    if (!contactResponse.ok) {
      console.error(`Failed to fetch contact ${contactId}`)
      return null
    }

    const contactData = await contactResponse.json()
    return {
      id: contactData.id,
      properties: contactData.properties,
    }
  } catch (error) {
    console.error(`Error fetching contact for deal ${dealId}:`, error)
    return null
  }
}

/**
 * Update deal property to mark reminder as sent
 */
export async function markReminderAsSent(
  dealId: string,
  reminderType: 'd7' | 'd3' | 'd1',
  apiKey: string,
): Promise<void> {
  try {
    const propertyName = `meetup_reminder_${reminderType}_sent`
    
    const response = await fetch(`https://api.hubapi.com/crm/v3/objects/deals/${dealId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          [propertyName]: 'true',
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error(`Failed to update deal ${dealId}:`, JSON.stringify(errorData, null, 2))
      throw new Error(`Failed to mark reminder as sent: ${errorData.message || response.statusText}`)
    }

    console.log(`Deal ${dealId}: ${propertyName} = true`)
  } catch (error) {
    console.error(`Error marking reminder as sent for deal ${dealId}:`, error)
    throw error
  }
}

