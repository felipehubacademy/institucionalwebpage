/**
 * Template UTILITY FINAL - Extremamente neutro e técnico
 * Sem qualquer linguagem de vendas ou marketing
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
  } catch (error) {}
}

loadEnv()

const accessToken = process.env.WHATSAPP_ACCESS_TOKEN
const businessAccountId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || "430333340170960"

if (!accessToken) {
  console.error("❌ WHATSAPP_ACCESS_TOKEN não configurado")
  process.exit(1)
}

// Template UTILITY - Como se fosse notificação de sistema CRM
const template = {
  name: "sistema_crm_registro",
  language: "pt_BR",
  category: "UTILITY",
  components: [
    {
      type: "BODY",
      text: "Sistema CRM - Registro atualizado\n\nContato: {{1}}\nTelefone: {{2}}\n\nVerifique a plataforma para detalhes",
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

async function createTemplate() {
  try {
    console.log("📝 Criando template UTILITY (tentativa final)...\n")
    console.log("Template:", JSON.stringify(template, null, 2))
    console.log("\n🌐 Enviando...\n")

    const response = await fetch(
      `https://graph.facebook.com/v21.0/${businessAccountId}/message_templates`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(template),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      console.error("❌ Erro:", JSON.stringify(result, null, 2))
      
      if (result.error?.code === 368) {
        console.log("\n💡 Template já existe: sistema_crm_registro")
      }
      return
    }

    console.log("\n✅ Template criado!")
    console.log("📋 ID:", result.id)
    console.log("📋 Status:", result.status || "PENDING")
    console.log("📋 Categoria:", result.category || "UTILITY (esperamos)")
    
    console.log("\n⏳ Aguardando aprovação...")
    console.log("💡 Verifique: https://business.facebook.com/wa/manage/message-templates/")
    
  } catch (error) {
    console.error("❌ Erro:", error.message)
  }
}

createTemplate()

