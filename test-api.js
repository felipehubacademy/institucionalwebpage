/**
 * Teste rápido da API /api/lead
 * Execute: node test-api.js
 */

const testData = {
  firstName: "Teste",
  lastName: `Usuario ${Date.now()}`,
  email: `teste-${Date.now()}@example.com`,
  phone: "11987654321",
  company: "Empresa Teste",
  role: "Gerente",
  preferredTime: "Manhã", // Campo removido: level
  consent: true,
  utm_source: "test",
  utm_medium: "local",
  utm_campaign: "teste-fluxo"
}

async function test() {
  console.log("🧪 Testando /api/lead...\n")
  console.log("📋 Dados:", JSON.stringify(testData, null, 2))
  
  try {
    const res = await fetch("http://localhost:3000/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testData)
    })
    
    const text = await res.text()
    let result
    try {
      result = JSON.parse(text)
    } catch {
      console.log("\n❌ Erro:", text)
      return
    }
    
    console.log(`\n📊 Status: ${res.status}`)
    console.log("📦 Response:", JSON.stringify(result, null, 2))
    
    if (res.status === 201) {
      console.log("\n✅ SUCESSO!")
      console.log("\n🔍 Verifique no HubSpot:")
      console.log(`   - Contato: ${testData.email}`)
      console.log(`   - Deal: Assessment – ${testData.firstName} ${testData.lastName} – ${testData.company}`)
    } else {
      console.log("\n❌ FALHA!")
      if (result.details) {
        console.log("Detalhes:", result.details)
      }
    }
  } catch (error) {
    console.error("\n❌ Erro:", error.message)
    console.log("\n💡 Certifique-se de que:")
    console.log("   1. Servidor está rodando (pnpm dev)")
    console.log("   2. Variáveis no .env.local estão configuradas")
  }
}

test()

