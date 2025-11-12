/**
 * Script para monitorar aprovação de template de WhatsApp
 * Verifica a cada 30 segundos se o template foi aprovado
 * Execute: node scripts/monitorar-aprovacao-template.js [nome_do_template]
 * 
 * Exemplo:
 * node scripts/monitorar-aprovacao-template.js alerta_sistema_cadastro
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
const checkInterval = 30000 // 30 segundos

if (!accessToken) {
  console.error("❌ WHATSAPP_ACCESS_TOKEN não configurado")
  process.exit(1)
}

let checkCount = 0
let lastStatus = null

/**
 * Verificar status do template
 */
async function checkTemplate() {
  try {
    checkCount++
    const now = new Date().toLocaleString('pt-BR')
    
    console.log(`\n[${now}] Verificação #${checkCount} - Template: ${templateName}`)
    
    const url = `https://graph.facebook.com/v21.0/${businessAccountId}/message_templates?name=${templateName}&limit=10`
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("❌ Erro:", data.error?.message || "Erro desconhecido")
      return false
    }

    if (!data.data || data.data.length === 0) {
      console.log("⏳ Template ainda não encontrado...")
      console.log("   Aguardando criação/aprovação...")
      return false
    }

    const template = data.data.find(t => t.name === templateName) || data.data[0]
    const currentStatus = template.status
    const currentCategory = template.category

    // Se o status mudou, mostrar
    if (lastStatus !== currentStatus) {
      console.log("\n🔄 STATUS MUDOU!")
      lastStatus = currentStatus
    }

    console.log(`   Status: ${currentStatus || "N/A"}`)
    console.log(`   Categoria: ${currentCategory || "N/A"}`)

    if (currentStatus === "APPROVED") {
      console.log("\n✅✅✅ TEMPLATE APROVADO! ✅✅✅\n")
      console.log("📋 Detalhes:")
      console.log(`   Nome: ${template.name}`)
      console.log(`   ID: ${template.id}`)
      console.log(`   Status: ${currentStatus}`)
      console.log(`   Categoria: ${currentCategory}`)
      
      if (currentCategory === "UTILITY") {
        console.log("\n🎉 PERFEITO! Categoria UTILITY - Sem limites de marketing!")
        console.log("💡 Posso atualizar o código agora para usar este template.")
      } else if (currentCategory === "MARKETING") {
        console.log("\n⚠️  Template foi reclassificado como MARKETING")
        console.log("💡 Pode ter limites de envio (erro 131049)")
        console.log("💡 Mas está aprovado e pode ser usado.")
      }
      
      return true // Template aprovado, parar monitoramento
    } else if (currentStatus === "REJECTED") {
      console.log("\n❌ TEMPLATE REJEITADO!")
      if (template.rejection_reason) {
        console.log(`   Motivo: ${template.rejection_reason}`)
      }
      console.log("💡 Precisa ser corrigido e reenviado.")
      return true // Template rejeitado, parar monitoramento
    } else if (currentStatus === "PENDING") {
      console.log("   ⏳ Aguardando aprovação...")
      return false // Continuar monitorando
    }

    return false
  } catch (error) {
    console.error("❌ Erro:", error.message)
    return false
  }
}

/**
 * Monitorar template continuamente
 */
async function monitor() {
  console.log("🔍 Iniciando monitoramento de template...")
  console.log(`   Template: ${templateName}`)
  console.log(`   Business Account ID: ${businessAccountId}`)
  console.log(`   Intervalo: ${checkInterval / 1000} segundos`)
  console.log("\n💡 Pressione Ctrl+C para parar\n")

  const interval = setInterval(async () => {
    const approved = await checkTemplate()
    
    if (approved) {
      clearInterval(interval)
      console.log("\n✅ Monitoramento concluído!")
      process.exit(0)
    }
  }, checkInterval)

  // Verificar imediatamente na primeira vez
  const approved = await checkTemplate()
  if (approved) {
    clearInterval(interval)
    console.log("\n✅ Monitoramento concluído!")
    process.exit(0)
  }
}

// Tratar Ctrl+C
process.on('SIGINT', () => {
  console.log("\n\n⏹️  Monitoramento interrompido pelo usuário")
  process.exit(0)
})

// Iniciar monitoramento
monitor()

