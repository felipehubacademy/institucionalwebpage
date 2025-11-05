/**
 * Script de teste para o endpoint /api/lead
 * 
 * Uso:
 * 1. Certifique-se de que o servidor está rodando: npm run dev
 * 2. Execute: node test-lead-api.js
 * 
 * Verifique no HubSpot:
 * - Contato criado/atualizado com os dados
 * - Deal criado no pipeline correto
 * - Deal associado ao contato
 */

const testData = {
  firstName: "João",
  lastName: "Silva",
  email: `test-${Date.now()}@example.com`, // Email único para evitar conflitos
  phone: "11987654321",
  company: "Empresa Teste",
  role: "Gerente de Projetos",
  level: "B1 (consigo, mas travo)",
  preferredTime: "Manhã",
  consent: true,
  utm_source: "test",
  utm_medium: "script",
  utm_campaign: "api-test",
}

async function testLeadAPI() {
  console.log("🧪 Testando endpoint /api/lead...")
  console.log("\n📋 Dados do teste:")
  console.log(JSON.stringify(testData, null, 2))

  try {
    const response = await fetch("http://localhost:3000/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    })

    let result
    const text = await response.text()
    try {
      result = JSON.parse(text)
    } catch (e) {
      console.log("\n❌ Erro ao parsear resposta JSON:")
      console.log(text)
      return
    }

    console.log("\n📊 Resultado:")
    console.log(`Status: ${response.status}`)
    console.log(`Response:`, JSON.stringify(result, null, 2))

    if (response.status === 201) {
      console.log("\n✅ SUCESSO! Lead criado com sucesso.")
      console.log("\n🔍 Próximos passos:")
      console.log("1. Verifique no HubSpot se o contato foi criado/atualizado:")
      console.log(`   - Email: ${testData.email}`)
      console.log("2. Verifique se o Deal foi criado:")
      console.log(`   - Nome: Assessment – ${testData.firstName} ${testData.lastName} – ${testData.company}`)
      console.log("3. Verifique se o Deal está associado ao contato")
      console.log("4. Verifique se o Deal está no pipeline correto")
    } else {
      console.log("\n❌ ERRO! Falha ao processar lead.")
      if (result.error) {
        console.log(`Erro: ${result.error}`)
      }
      if (result.details) {
        console.log("Detalhes:", result.details)
      }
    }
  } catch (error) {
    console.error("\n❌ ERRO ao fazer requisição:", error.message)
    console.log("\n💡 Certifique-se de que:")
    console.log("1. O servidor está rodando (npm run dev)")
    console.log("2. As variáveis de ambiente estão configuradas:")
    console.log("   - HUBSPOT_PRIVATE_APP_TOKEN")
    console.log("   - HUBSPOT_PIPELINE_ID")
    console.log("   - HUBSPOT_DEAL_STAGE_ID")
  }
}

testLeadAPI()

