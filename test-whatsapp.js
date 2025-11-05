/**
 * Teste de envio de WhatsApp com template assessment_confirmacao
 */

// Carregar variáveis de ambiente do .env.local
import { readFileSync } from 'fs'
import { resolve } from 'path'

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
    console.error("Erro ao carregar .env.local:", error.message)
  }
}

loadEnv()

const accessToken = process.env.WHATSAPP_ACCESS_TOKEN
const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
const testPhone = "5511978229898" // Seu número
const testName = "Felipe" // Seu nome

if (!accessToken || !phoneNumberId) {
  console.error("❌ WHATSAPP_ACCESS_TOKEN ou WHATSAPP_PHONE_NUMBER_ID não configurados")
  process.exit(1)
}

async function testWhatsApp() {
  try {
    console.log("📱 Testando envio de WhatsApp...\n")
    console.log("📋 Configuração:")
    console.log(`   - Telefone: ${testPhone}`)
    console.log(`   - Nome: ${testName}`)
    console.log(`   - Template: assessment_confirmacao\n`)
    
    const response = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: testPhone,
        type: "template",
        template: {
          name: "assessment_confirmacao",
          language: {
            code: "pt_BR"
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: testName
                }
              ]
            }
          ]
        }
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error("❌ Erro ao enviar WhatsApp:", JSON.stringify(result, null, 2))
      return
    }

    console.log("✅ WhatsApp enviado com sucesso!")
    console.log("📋 Message ID:", result.messages?.[0]?.id)
    console.log("\n📱 Verifique seu WhatsApp!")
    
  } catch (error) {
    console.error("❌ Erro:", error.message)
  }
}

testWhatsApp()

