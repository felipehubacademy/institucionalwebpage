import { Client } from "@hubspot/api-client"

/**
 * HubSpot Client wrapper - Unificado para Assessment e Meetup
 * Usa Private App Token ou API Key para autenticação
 * 
 * Prioriza HUBSPOT_PRIVATE_APP_TOKEN, usa HUBSPOT_API_KEY como fallback
 */

const hubspotClient = new Client({
  accessToken: process.env.HUBSPOT_PRIVATE_APP_TOKEN || process.env.HUBSPOT_API_KEY || "",
})

interface ContactData {
  firstname: string
  lastname: string
  email: string
  phone: string
  company?: string
  jobtitle?: string
  hub_level?: string
  preferred_time?: string
  lgpd_consent?: boolean
  source?: string
  hs_lead_status?: string
  hubspot_owner_id?: string
  lifecyclestage?: string
  origem?: string
}

interface DealData {
  dealname: string
  pipeline: string
  dealstage: string
  associatedcompanyid?: string
  hubspot_owner_id?: string
}

/**
 * Upsert contact by email (create if doesn't exist, update if exists)
 */
export async function upsertContact(data: ContactData): Promise<{ vid: number }> {
  try {
    // Buscar contato existente por email
    const searchResponse = await hubspotClient.crm.contacts.searchApi.doSearch({
      query: data.email,
      filterGroups: [
        {
          filters: [
            {
              propertyName: "email",
              operator: "EQ",
              value: data.email,
            },
          ],
        },
      ],
      limit: 1,
      properties: ["id", "email"],
    })

    const existingContact = searchResponse.results?.[0]

    const properties: Record<string, string | boolean> = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
    }

    if (data.company) {
      properties.company = data.company
    }

    if (data.jobtitle) {
      properties.jobtitle = data.jobtitle
    }

    // Propriedades do HubSpot (mesmo padrão do MEETUP)
    if (data.hs_lead_status) {
      properties.hs_lead_status = data.hs_lead_status
    }

    if (data.hubspot_owner_id) {
      properties.hubspot_owner_id = data.hubspot_owner_id
    }

    if (data.lifecyclestage) {
      properties.lifecyclestage = data.lifecyclestage
    }

    if (data.origem) {
      properties.origem = data.origem
    }

    // Campo customizado: Preferência de Horário
    // Criar no HubSpot: Settings > Properties > Contact Properties
    // - Label: "Preferência de Horário"
    // - Internal name: "preferred_time"
    // - Type: Single-line text ou Dropdown (Manhã, Tarde, Noite)
    if (data.preferred_time) {
      properties.preferred_time = data.preferred_time
    }

    if (existingContact) {
      // Atualizar contato existente
      await hubspotClient.crm.contacts.basicApi.update(existingContact.id, {
        properties,
      })
      return { vid: Number(existingContact.id) }
    } else {
      // Criar novo contato
      const createResponse = await hubspotClient.crm.contacts.basicApi.create({
        properties,
      })
      return { vid: Number(createResponse.id) }
    }
  } catch (error: any) {
    console.error("HubSpot upsertContact error:", error)
    throw new Error(`Falha ao criar/atualizar contato: ${error.message || "Erro desconhecido"}`)
  }
}

/**
 * Create deal and associate with contact
 */
export async function createDeal(
  dealData: DealData,
  contactId: number,
): Promise<{ dealId: string }> {
  try {
    const properties: Record<string, string> = {
      dealname: dealData.dealname,
      pipeline: dealData.pipeline,
      dealstage: dealData.dealstage,
    }

    if (dealData.associatedcompanyid) {
      properties.associatedcompanyid = dealData.associatedcompanyid
    }

    if (dealData.hubspot_owner_id) {
      properties.hubspot_owner_id = dealData.hubspot_owner_id
    }

    const createResponse = await hubspotClient.crm.deals.basicApi.create({
      properties,
      associations: [
        {
          to: { id: String(contactId) },
          types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }], // Contact to Deal
        },
      ],
    })

    return { dealId: String(createResponse.id) }
  } catch (error: any) {
    console.error("HubSpot createDeal error:", error)
    throw new Error(`Falha ao criar deal: ${error.message || "Erro desconhecido"}`)
  }
}

/**
 * Update contact qualification properties
 */
export async function updateContactQualification(
  email: string,
  qualificationData: {
    assessment_career_level?: string
    assessment_english_situation?: string
    assessment_english_pain_points?: string
    assessment_motivation?: string
    assessment_timeline?: string
    assessment_previous_investment?: string
    assessment_budget?: string
    assessment_personalized_plan?: string
  }
): Promise<{ success: boolean }> {
  try {
    // Buscar contato por email
    const searchResponse = await hubspotClient.crm.contacts.searchApi.doSearch({
      query: email,
      filterGroups: [
        {
          filters: [
            {
              propertyName: "email",
              operator: "EQ",
              value: email,
            },
          ],
        },
      ],
      limit: 1,
      properties: ["id", "email"],
    })

    const contact = searchResponse.results?.[0]

    if (!contact) {
      throw new Error(`Contato não encontrado com email: ${email}`)
    }

    // Preparar propriedades para atualização
    const properties: Record<string, string> = {}

    if (qualificationData.assessment_career_level) {
      properties.assessment_career_level = qualificationData.assessment_career_level
    }

    if (qualificationData.assessment_english_situation) {
      properties.assessment_english_situation = qualificationData.assessment_english_situation
    }

    if (qualificationData.assessment_english_pain_points) {
      properties.assessment_english_pain_points = qualificationData.assessment_english_pain_points
    }

    if (qualificationData.assessment_motivation) {
      properties.assessment_motivation = qualificationData.assessment_motivation
    }

    if (qualificationData.assessment_timeline) {
      properties.assessment_timeline = qualificationData.assessment_timeline
    }

    if (qualificationData.assessment_previous_investment) {
      properties.assessment_previous_investment = qualificationData.assessment_previous_investment
    }

    if (qualificationData.assessment_budget) {
      properties.assessment_budget = qualificationData.assessment_budget
    }

    if (qualificationData.assessment_personalized_plan) {
      properties.assessment_personalized_plan = qualificationData.assessment_personalized_plan
    }

    // Atualizar contato
    await hubspotClient.crm.contacts.basicApi.update(contact.id, {
      properties,
    })

    return { success: true }
  } catch (error: any) {
    console.error("HubSpot updateContactQualification error:", error)
    throw new Error(`Falha ao atualizar qualificação: ${error.message || "Erro desconhecido"}`)
  }
}

/**
 * Get contact by email (for retrieving phone number)
 */
export async function getContactByEmail(email: string): Promise<{ vid: number; phone?: string; firstname?: string } | null> {
  try {
    const searchResponse = await hubspotClient.crm.contacts.searchApi.doSearch({
      query: email,
      filterGroups: [
        {
          filters: [
            {
              propertyName: "email",
              operator: "EQ",
              value: email,
            },
          ],
        },
      ],
      limit: 1,
      properties: ["id", "email", "phone", "firstname"],
    })

    const contact = searchResponse.results?.[0]

    if (!contact) {
      return null
    }

    return {
      vid: Number(contact.id),
      phone: contact.properties?.phone,
      firstname: contact.properties?.firstname,
    }
  } catch (error: any) {
    console.error("HubSpot getContactByEmail error:", error)
    throw new Error(`Falha ao buscar contato: ${error.message || "Erro desconhecido"}`)
  }
}

/**
 * Get UTM source string from individual UTM parameters
 */
export function getUTMSource(utm: {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
}): string {
  const parts: string[] = []
  if (utm.utm_source) parts.push(utm.utm_source)
  if (utm.utm_medium) parts.push(utm.utm_medium)
  if (utm.utm_campaign) parts.push(utm.utm_campaign)
  return parts.join(" - ")
}

