/**
 * Script para verificar status de templates de WhatsApp
 * Execute: node scripts/verificar-status-template.js [nome_do_template]
 * 
 * Exemplo:
 * node scripts/verificar-status-template.js alerta_sistema_cadastro
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
const businessAccountId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || "430333340170960"
const templateName = process.argv[2] || "alerta_sistema_cadastro"

if (!accessToken) {
  console.error("❌ WHATSAPP_ACCESS_TOKEN não configurado")
  process.exit(1)
}

/**
 * Verificar status de um template específico
 */
async function checkTemplateStatus(templateName) {
  try {
    console.log(`🔍 Verificando status do template: ${templateName}\n`)
    
    // Listar todos os templates
    const url = `https://graph.facebook.com/v21.0/${businessAccountId}/message_templates?name=${templateName}&limit=10`
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("❌ Erro ao verificar templates:", JSON.stringify(data, null, 2))
      return null
    }

    if (!data.data || data.data.length === 0) {
      console.log(`⚠️  Template "${templateName}" não encontrado`)
      console.log("\n💡 Possíveis motivos:")
      console.log("   - Template ainda não foi criado")
      console.log("   - Nome do template está diferente")
      console.log("   - Business Account ID incorreto")
      return null
    }

    // Encontrar o template mais recente com esse nome
    const template = data.data.find(t => t.name === templateName) || data.data[0]
    
    console.log("✅ Template encontrado!\n")
    console.log("📋 Detalhes:")
    console.log(`   Nome: ${template.name}`)
    console.log(`   ID: ${template.id}`)
    console.log(`   Status: ${template.status || "N/A"}`)
    console.log(`   Categoria: ${template.category || "N/A"}`)
    console.log(`   Idioma: ${template.language || "N/A"}`)
    
    if (template.components) {
      console.log("\n📝 Componentes:")
      template.components.forEach((comp, index) => {
        if (comp.type === "BODY") {
          console.log(`   ${index + 1}. Corpo da mensagem:`)
          console.log(`      ${comp.text?.replace(/\n/g, "\\n") || "N/A"}`)
        } else if (comp.type === "HEADER") {
          console.log(`   ${index + 1}. Cabeçalho:`)
          console.log(`      ${comp.text || comp.format || "N/A"}`)
        } else if (comp.type === "FOOTER") {
          console.log(`   ${index + 1}. Rodapé:`)
          console.log(`      ${comp.text || "N/A"}`)
        } else if (comp.type === "BUTTONS") {
          console.log(`   ${index + 1}. Botões:`)
          comp.buttons?.forEach((btn, btnIndex) => {
            console.log(`      ${btnIndex + 1}. ${btn.type}: ${btn.text || btn.url || "N/A"}`)
          })
        }
      })
    }
    
    // Status específico
    console.log("\n📊 Status:")
    if (template.status === "APPROVED") {
      console.log("   ✅ APROVADO - Pode ser usado!")
    } else if (template.status === "PENDING") {
      console.log("   ⏳ PENDENTE - Aguardando aprovação")
      console.log("   💡 Pode levar algumas horas para ser aprovado")
    } else if (template.status === "REJECTED") {
      console.log("   ❌ REJEITADO - Precisa ser corrigido")
      if (template.rejection_reason) {
        console.log(`   Motivo: ${template.rejection_reason}`)
      }
    } else {
      console.log(`   ⚠️  Status desconhecido: ${template.status}`)
    }
    
    // Categoria
    console.log("\n🏷️  Categoria:")
    if (template.category === "UTILITY") {
      console.log("   ✅ UTILITY - Sem limites de marketing!")
    } else if (template.category === "MARKETING") {
      console.log("   ⚠️  MARKETING - Pode ter limites de envio")
      console.log("   💡 Se tiver erro 131049, é por causa desta categoria")
    } else {
      console.log(`   📋 ${template.category || "N/A"}`)
    }
    
    return template
  } catch (error) {
    console.error("❌ Erro:", error.message)
    return null
  }
}

/**
 * Listar todos os templates recentes
 */
async function listAllTemplates() {
  try {
    console.log("📋 Listando todos os templates recentes...\n")
    
    const url = `https://graph.facebook.com/v21.0/${businessAccountId}/message_templates?limit=20`
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("❌ Erro ao listar templates:", JSON.stringify(data, null, 2))
      return
    }

    if (!data.data || data.data.length === 0) {
      console.log("⚠️  Nenhum template encontrado")
      return
    }

    console.log(`✅ Encontrados ${data.data.length} templates:\n`)
    
    data.data.forEach((template, index) => {
      console.log(`${index + 1}. ${template.name}`)
      console.log(`   Status: ${template.status || "N/A"}`)
      console.log(`   Categoria: ${template.category || "N/A"}`)
      console.log(`   Idioma: ${template.language || "N/A"}`)
      console.log("")
    })
    
  } catch (error) {
    console.error("❌ Erro:", error.message)
  }
}

// Main
(async () => {
  console.log("🔍 Verificando templates de WhatsApp\n")
  console.log(`Business Account ID: ${businessAccountId}\n`)
  
  const template = await checkTemplateStatus(templateName)
  
  if (!template) {
    console.log("\n📋 Listando todos os templates disponíveis...\n")
    await listAllTemplates()
  }
  
  console.log("\n💡 Para verificar novamente, execute:")
  console.log(`   node scripts/verificar-status-template.js ${templateName}`)
  console.log("\n💡 Para listar todos os templates:")
  console.log("   node scripts/verificar-status-template.js")
})()

