/**
 * Script para verificar status de uma mensagem WhatsApp enviada
 * Execute: node verificar-status-mensagem.js [MESSAGE_ID]
 * 
 * Exemplo:
 * node verificar-status-mensagem.js wamid.HBgNNTUxMTk5MDIzOTA3ORUCABEYEjQ2OEZDRkRGNDAyQTE2NzIyQQA=
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
const messageId = process.argv[2] || "wamid.HBgNNTUxMTk5MDIzOTA3ORUCABEYEjQ2OEZDRkRGNDAyQTE2NzIyQQA="

if (!accessToken) {
  console.error("❌ WHATSAPP_ACCESS_TOKEN não configurado")
  process.exit(1)
}

async function checkMessageStatus() {
  try {
    console.log("🔍 Verificando status da mensagem...\n")
    console.log("Message ID:", messageId)
    console.log("")

    // Verificar status completo da mensagem
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${messageId}?fields=status,from,to,timestamp,type,errors`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error("❌ Erro ao verificar status:", JSON.stringify(data, null, 2))
      
      if (data.error) {
        console.error("\n📋 Detalhes do erro:")
        console.error(`   Código: ${data.error.code}`)
        console.error(`   Mensagem: ${data.error.message}`)
        console.error(`   Tipo: ${data.error.type}`)
        if (data.error.error_subcode) {
          console.error(`   Subcódigo: ${data.error.error_subcode}`)
        }
      }
      return
    }

    console.log("✅ Status da mensagem:")
    console.log(JSON.stringify(data, null, 2))
    
    if (data.status) {
      console.log("\n📊 Status:", data.status)
      console.log("\n💡 Significados:")
      console.log("   - sent: Mensagem enviada para o WhatsApp")
      console.log("   - delivered: Mensagem entregue no dispositivo")
      console.log("   - read: Mensagem lida pelo destinatário")
      console.log("   - failed: Mensagem falhou ao enviar")
      
      if (data.status === 'failed') {
        console.log("\n⚠️ MENSAGEM FALHOU!")
        if (data.errors && data.errors.length > 0) {
          console.log("\n📋 Erros:")
          data.errors.forEach((error, index) => {
            console.log(`   ${index + 1}. Código: ${error.code}`)
            console.log(`      Mensagem: ${error.message}`)
            if (error.title) console.log(`      Título: ${error.title}`)
          })
        }
      } else if (data.status === 'sent') {
        console.log("\n⚠️ Mensagem foi enviada mas ainda não foi entregue.")
        console.log("   Isso pode levar alguns segundos/minutos.")
        console.log("   Execute o script novamente em alguns instantes para verificar se foi entregue.")
      } else if (data.status === 'delivered') {
        console.log("\n✅ Mensagem foi entregue!")
        console.log("   Se não chegou, pode ser:")
        console.log("   - Número bloqueado")
        console.log("   - WhatsApp não instalado")
        console.log("   - Número inválido")
      }
    }
    
    if (data.from) {
      console.log(`\n📤 De: ${data.from}`)
    }
    if (data.to) {
      console.log(`📥 Para: ${data.to}`)
    }
    if (data.timestamp) {
      const date = new Date(parseInt(data.timestamp) * 1000)
      console.log(`🕐 Timestamp: ${date.toLocaleString('pt-BR')}`)
    }
    
  } catch (error) {
    console.error("❌ Erro:", error.message)
    console.error(error.stack)
  }
}

checkMessageStatus()

