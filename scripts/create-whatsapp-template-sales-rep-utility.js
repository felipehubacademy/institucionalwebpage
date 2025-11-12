/**
 * Script para criar template UTILITY de WhatsApp para notificação do Sales Rep
 * Template neutro e funcional para evitar limites de marketing
 * Execute: node scripts/create-whatsapp-template-sales-rep-utility.js
 */

const { readFileSync } = require('fs')
const { resolve } = require('path')

function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), '.env.local')
    const envFile = readFileSync(envPath, 'utf-8')
    const envVars = {}
    
    envFile.split('\n').forEach(line => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim()
        }
      }
    })
    
    Object.assign(process.env, envVars)
  } catch (error) {
    // .env.local não existe ou não pode ser lido, usar variáveis do sistema
  }
}

loadEnv()

const accessToken = process.env.WHATSAPP_ACCESS_TOKEN
const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
let businessAccountId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID

if (!accessToken) {
  console.error("❌ WHATSAPP_ACCESS_TOKEN não configurado")
  process.exit(1)
}

// Template UTILITY - extremamente neutro e técnico, sem qualquer linguagem de marketing
const template = {
  name: "alerta_sistema_cadastro",
  language: "pt_BR",
  category: "UTILITY", // UTILITY para evitar limites de marketing
  components: [
    {
      type: "BODY",
      text: "Alerta do sistema\n\nNovo registro recebido\n\nContato: {{1}}\nTelefone: {{2}}\n\nAcao requerida: revisar cadastro",
      example: {
        body_text: [
          [
            "João Silva",
            "+5511987654321"
          ]
        ]
      }
    }
  ]
}

/**
 * Descobrir Business Account ID automaticamente
 */
async function getBusinessAccountId() {
  if (businessAccountId) {
    return businessAccountId
  }

  try {
    if (phoneNumberId) {
      console.log("🔍 Descobrindo Business Account ID via Phone Number ID...")
      const response = await fetch(
        `https://graph.facebook.com/v21.0/${phoneNumberId}?fields=whatsapp_business_account_id`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (response.ok) {
        const data = await response.json()
        if (data.whatsapp_business_account_id) {
          const accountId = data.whatsapp_business_account_id.id || data.whatsapp_business_account_id
          console.log(`✅ Business Account ID encontrado: ${accountId}`)
          return accountId
        }
      }
    }

    // Tentar via /me
    console.log("🔍 Tentando descobrir via /me...")
    const meResponse = await fetch(`https://graph.facebook.com/v21.0/me?fields=whatsapp_business_accounts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (meResponse.ok) {
      const meData = await meResponse.json()
      if (meData.whatsapp_business_accounts?.data?.length > 0) {
        const accountId = meData.whatsapp_business_accounts.data[0].id
        console.log(`✅ Business Account ID encontrado: ${accountId}`)
        return accountId
      }
    }

    // Última tentativa: listar todos
    console.log("🔍 Tentando listar todos os Business Accounts...")
    const listResponse = await fetch(`https://graph.facebook.com/v21.0/whatsapp_business_accounts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (listResponse.ok) {
      const listData = await listResponse.json()
      if (listData.data?.length > 0) {
        const accountId = listData.data[0].id
        console.log(`✅ Business Account ID encontrado: ${accountId}`)
        return accountId
      }
    }
  } catch (error) {
    console.error("❌ Erro ao descobrir Business Account ID:", error.message)
  }

  return null
}

/**
 * Criar template de WhatsApp
 */
async function createTemplate() {
  try {
    console.log("📝 Criando template UTILITY de WhatsApp para notificação do Sales Rep...\n")
    console.log("Template:", JSON.stringify(template, null, 2))
    
    if (!businessAccountId) {
      console.error("❌ WHATSAPP_BUSINESS_ACCOUNT_ID não encontrado")
      return
    }
    
    const url = `https://graph.facebook.com/v21.0/${businessAccountId}/message_templates`
    
    console.log(`🌐 Enviando requisição para: ${url}\n`)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(template),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error("❌ Erro ao criar template:", JSON.stringify(result, null, 2))
      
      if (result.error?.code === 368) {
        console.log("\n💡 Template já existe. Você pode:")
        console.log("   1. Usar o template existente: notificacao_novo_lead")
        console.log("   2. Ou criar um novo com outro nome")
      }
      return
    }

    console.log("\n✅ Template UTILITY criado com sucesso!")
    console.log("📋 ID:", result.id)
    console.log("📋 Nome:", result.name)
    console.log("📋 Categoria:", result.category || "UTILITY")
    console.log("📋 Status:", result.status || "Pendente de aprovação")
    
    console.log("\n⏳ O template precisa ser aprovado pelo WhatsApp.")
    console.log("📱 Verifique no Meta Business Suite:")
    console.log("   https://business.facebook.com/wa/manage/message-templates/")
    
    console.log("\n💡 Depois de aprovado, atualize o código para usar este template:")
    console.log("   Template name: alerta_sistema_cadastro")
    
  } catch (error) {
    console.error("❌ Erro:", error.message)
  }
}

// Main
(async () => {
  if (!businessAccountId && phoneNumberId) {
    console.log("🔍 Tentando obter Business Account ID automaticamente...")
    businessAccountId = await getBusinessAccountId()
    if (businessAccountId) {
      console.log(`✅ Business Account ID encontrado: ${businessAccountId}\n`)
    }
  }

  if (!businessAccountId) {
    console.log("⚠️  WHATSAPP_BUSINESS_ACCOUNT_ID não configurado")
    console.log("💡 Configure no .env.local:")
    console.log("   WHATSAPP_BUSINESS_ACCOUNT_ID=430333340170960")
  } else {
    await createTemplate()
  }
})()

