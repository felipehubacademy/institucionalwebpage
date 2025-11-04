import { Client } from "@hubspot/api-client"

/**
 * HubSpot Client wrapper - Unificado para Assessment e Meetup
 * Usa Private App Token para autenticação
 * 
 * Reutiliza HUBSPOT_PRIVATE_APP_TOKEN já deployado no projeto
 */

const hubspotClient = new Client({
  accessToken: process.env.HUBSPOT_PRIVATE_APP_TOKEN,
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

    // Campos customizados (ajustar nomes conforme configuração do HubSpot)
    // IMPORTANTE: Verifique os nomes exatos dos campos customizados no HubSpot
    // e ajuste conforme necessário
    if (data.hub_level) {
      properties.hub_level = data.hub_level
    }

    if (data.preferred_time) {
      properties.preferred_time = data.preferred_time
    }

    if (data.lgpd_consent !== undefined) {
      properties.lgpd_consent = String(data.lgpd_consent)
    }

    if (data.source) {
      properties.hs_analytics_source = data.source
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

