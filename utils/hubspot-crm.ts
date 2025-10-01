/**
 * HubSpot CRM API v3 integration utilities
 */

interface ContactProperties {
  email: string
  firstname: string
  lastname: string
  phone: string
  english_level?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

interface DealProperties {
  dealname: string
  amount: string
  pipeline: string
  dealstage: string
  source: string
}

export async function createOrUpdateContact(
  properties: ContactProperties,
  apiKey: string,
): Promise<{ id: string; success: boolean; isNew: boolean }> {
  try {
    // First, search for existing contact by email
    const searchResponse = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: "email",
                  operator: "EQ",
                  value: properties.email,
                },
              ],
            },
          ],
        }),
      },
    )

    const searchData = await searchResponse.json()

    if (searchData.results && searchData.results.length > 0) {
      // Update existing contact
      const contactId = searchData.results[0].id
      const updateResponse = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ properties }),
        },
      )

      if (!updateResponse.ok) {
        throw new Error("Failed to update contact")
      }

      return { id: contactId, success: true, isNew: false }
    } else {
      // Create new contact
      const createResponse = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ properties }),
      })

      if (!createResponse.ok) {
        throw new Error("Failed to create contact")
      }

      const createData = await createResponse.json()
      return { id: createData.id, success: true, isNew: true }
    }
  } catch (error) {
    console.error("Error creating/updating contact:", error)
    throw error
  }
}

export async function createDeal(
  properties: DealProperties,
  contactId: string,
  apiKey: string,
): Promise<{ id: string; success: boolean }> {
  try {
    // Create deal
    const createResponse = await fetch(`https://api.hubapi.com/crm/v3/objects/deals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ properties }),
    })

    if (!createResponse.ok) {
      throw new Error("Failed to create deal")
    }

    const dealData = await createResponse.json()
    const dealId = dealData.id

    // Associate deal with contact
    await fetch(
      `https://api.hubapi.com/crm/v3/objects/deals/${dealId}/associations/contacts/${contactId}/deal_to_contact`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    )

    return { id: dealId, success: true }
  } catch (error) {
    console.error("Error creating deal:", error)
    throw error
  }
}


