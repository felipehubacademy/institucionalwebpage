/**
 * Script para encontrar quem está carregando o pixel antigo
 * 
 * COLE ESTE CÓDIGO NO CONSOLE (F12 > Console) E PRESSIONE ENTER
 */

console.log('🔍 Procurando origem do pixel antigo 2425136197757628...\n');

// 1. Verificar scripts que carregam fbevents.js
console.log('📜 SCRIPTS QUE CARREGAM FBEVENTS.JS:');
let foundFbevents = false;
Array.from(document.scripts).forEach((script, index) => {
  if (script.src && script.src.includes('fbevents.js')) {
    foundFbevents = true;
    console.log(`\n✅ Script #${index} encontrado:`);
    console.log('   URL:', script.src);
    console.log('   Elemento:', script);
    console.log('   HTML completo:', script.outerHTML);
    
    // Verificar se tem atributos que indicam origem
    if (script.id) console.log('   ID:', script.id);
    if (script.className) console.log('   Class:', script.className);
    if (script.getAttribute('data-gtm')) console.log('   GTM:', script.getAttribute('data-gtm'));
  }
});

if (!foundFbevents) {
  console.log('❌ Nenhum script fbevents.js encontrado diretamente');
}

// 2. Verificar scripts inline que inicializam o pixel antigo
console.log('\n\n📝 SCRIPTS INLINE QUE INICIALIZAM O PIXEL ANTIGO:');
let foundInline = false;
Array.from(document.scripts).forEach((script, index) => {
  const content = script.textContent || script.innerHTML;
  if (content && content.includes('2425136197757628')) {
    foundInline = true;
    console.log(`\n🚨 Script inline #${index} encontrado:`);
    console.log('   Conteúdo (primeiros 1000 caracteres):', content.substring(0, 1000));
    console.log('   Elemento completo:', script);
    
    // Verificar contexto ao redor
    const parent = script.parentElement;
    if (parent) {
      console.log('   Elemento pai:', parent.tagName, parent.id || parent.className);
    }
  }
});

if (!foundInline) {
  console.log('❌ Nenhum script inline com pixel antigo encontrado');
}

// 3. Verificar se há fbq já inicializado
console.log('\n\n🔧 VERIFICANDO FBQ INICIALIZADO:');
if (typeof window.fbq !== 'undefined') {
  console.log('✅ fbq está definido');
  console.log('   Tipo:', typeof window.fbq);
  
  // Tentar ver se há informações sobre pixels inicializados
  if (window._fbq && window._fbq.queue) {
    console.log('   Fila de eventos:', window._fbq.queue);
  }
} else {
  console.log('❌ fbq não está definido ainda');
}

// 4. Verificar se há algum elemento com data attributes do GTM
console.log('\n\n🏷️ VERIFICANDO ELEMENTOS COM DATA-GTM:');
const gtmElements = document.querySelectorAll('[data-gtm], [id*="gtm"], [class*="gtm"]');
if (gtmElements.length > 0) {
  console.log(`✅ Encontrados ${gtmElements.length} elementos relacionados ao GTM:`);
  gtmElements.forEach((el, index) => {
    console.log(`   Elemento #${index}:`, el.tagName, el.id || el.className);
  });
} else {
  console.log('❌ Nenhum elemento GTM encontrado');
}

// 5. Verificar requisições de performance
console.log('\n\n📊 REQUISIÇÕES DO FACEBOOK (Performance API):');
const facebookRequests = performance.getEntriesByType('resource')
  .filter(r => r.name.includes('facebook') || r.name.includes('2425136197757628'));

if (facebookRequests.length > 0) {
  facebookRequests.forEach((req, index) => {
    console.log(`\n   Requisição #${index}:`);
    console.log('   URL:', req.name);
    console.log('   Tipo:', req.initiatorType);
    console.log('   Tempo:', req.duration + 'ms');
  });
} else {
  console.log('❌ Nenhuma requisição do Facebook encontrada');
}

console.log('\n\n✅ Análise concluída! Verifique os resultados acima.');

