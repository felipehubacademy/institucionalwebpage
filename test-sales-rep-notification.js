/**
 * Script para testar notificação do Sales Rep
 * Execute: node test-sales-rep-notification.js
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
    // .env.local não existe ou não pode ser lido, usar variáveis do sistema
  }
}

loadEnv()

const accessToken = process.env.WHATSAPP_ACCESS_TOKEN
const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
const salesRepPhone = process.env.SALES_REP_WHATSAPP_PHONE

if (!accessToken || !phoneNumberId) {
  console.error("❌ WHATSAPP_ACCESS_TOKEN ou WHATSAPP_PHONE_NUMBER_ID não configurado")
  process.exit(1)
}

if (!salesRepPhone) {
  console.error("❌ SALES_REP_WHATSAPP_PHONE não configurado")
  console.error("   Configure no .env.local:")
  console.error("   SALES_REP_WHATSAPP_PHONE=5511990239079")
  process.exit(1)
}

// Dados do teste
const leadName = "Felipe"
const leadPhone = "+5511978229898" // Formato completo com +55

async function testNotification() {
  try {
    console.log("📱 Testando notificação do Sales Rep...\n")
    console.log("Dados do teste:")
    console.log(`   Sales Rep: ${salesRepPhone}`)
    console.log(`   Lead Nome: ${leadName}`)
    console.log(`   Lead Telefone: ${leadPhone}\n`)

    // Limpar telefone do lead (remover tudo que não é dígito)
    const cleanLeadPhone = leadPhone.replace(/\D/g, "")
    
    // Formatar telefone para exibição
    const phoneWithoutCountry = cleanLeadPhone.startsWith("55") ? cleanLeadPhone.slice(2) : cleanLeadPhone
    const formattedPhone = phoneWithoutCountry.length === 11 
      ? `(${phoneWithoutCountry.slice(0, 2)}) ${phoneWithoutCountry.slice(2, 7)}-${phoneWithoutCountry.slice(7)}`
      : phoneWithoutCountry

    const response = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: salesRepPhone.replace(/\D/g, ""),
        type: "template",
        template: {
          name: "novo_lead_notificacao_v2",
          language: {
            code: "pt_BR"
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: leadName
                },
                {
                  type: "text",
                  text: `+${cleanLeadPhone}` // Número completo com + para WhatsApp reconhecer como clicável
                }
              ]
            }
          ]
        }
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error("❌ Erro ao enviar notificação:", JSON.stringify(result, null, 2))
      if (result.error) {
        console.error(`   Código: ${result.error.code}`)
        console.error(`   Mensagem: ${result.error.message}`)
        if (result.error.error_subcode) {
          console.error(`   Subcódigo: ${result.error.error_subcode}`)
        }
      }
      return
    }

    console.log("✅ Notificação enviada com sucesso!")
    console.log("\n📋 Detalhes:")
    console.log(`   Message ID: ${result.messages?.[0]?.id}`)
    console.log(`   Template: novo_lead_notificacao_v2`)
    console.log(`   Para: ${salesRepPhone}`)
    console.log("\n📱 Verifique o WhatsApp do sales rep!")
    
  } catch (error) {
    console.error("❌ Erro:", error.message)
  }
}

testNotification()

