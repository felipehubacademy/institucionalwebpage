/**
 * Encontrar exatamente onde está o script do pixel antigo no HTML
 * 
 * COLE ESTE CÓDIGO NO CONSOLE E PRESSIONE ENTER
 */

console.log('🔍 Procurando script do pixel antigo no HTML...\n');

// Encontrar o script exato
const scripts = Array.from(document.scripts);
let found = false;

scripts.forEach((script, index) => {
  const src = script.src;
  const content = script.textContent || script.innerHTML;
  
  // Verificar se é o script do pixel antigo
  if (src && src.includes('2425136197757628')) {
    found = true;
    console.log(`🚨 SCRIPT DO PIXEL ANTIGO ENCONTRADO!`);
    console.log(`\n📍 Script #${index}:`);
    console.log('   URL:', src);
    console.log('   Elemento completo:', script);
    console.log('   HTML:', script.outerHTML);
    console.log('   ID:', script.id || 'sem ID');
    console.log('   Class:', script.className || 'sem class');
    
    // Verificar elemento pai
    const parent = script.parentElement;
    if (parent) {
      console.log('\n   📦 ELEMENTO PAI:');
      console.log('   Tag:', parent.tagName);
      console.log('   ID:', parent.id || 'sem ID');
      console.log('   Class:', parent.className || 'sem class');
      console.log('   HTML (primeiros 500 chars):', parent.outerHTML.substring(0, 500));
    }
    
    // Verificar se tem atributos especiais
    console.log('\n   🏷️ ATRIBUTOS:');
    Array.from(script.attributes).forEach(attr => {
      console.log(`   ${attr.name}: ${attr.value}`);
    });
    
    // Verificar se foi injetado pelo GTM
    if (script.id && script.id.includes('gtm')) {
      console.log('\n   ⚠️ POSSÍVEL ORIGEM: GTM (Google Tag Manager)');
    }
    if (script.getAttribute('data-gtm')) {
      console.log('\n   ⚠️ POSSÍVEL ORIGEM: GTM (atributo data-gtm encontrado)');
    }
  }
  
  // Verificar também scripts inline que podem inicializar
  if (content && content.includes('2425136197757628')) {
    console.log(`\n🚨 SCRIPT INLINE COM PIXEL ANTIGO ENCONTRADO!`);
    console.log(`   Script #${index}:`);
    console.log('   Conteúdo:', content.substring(0, 1000));
    console.log('   Elemento:', script);
  }
});

if (!found) {
  console.log('❌ Script não encontrado diretamente, mas está no HTML');
  console.log('   Isso significa que pode estar sendo injetado dinamicamente');
}

// Verificar se há algum iframe do GTM que pode estar injetando
console.log('\n\n🔍 VERIFICANDO IFRAMES DO GTM:');
const iframes = document.querySelectorAll('iframe');
iframes.forEach((iframe, index) => {
  if (iframe.src && iframe.src.includes('googletagmanager')) {
    console.log(`   Iframe GTM #${index}:`, iframe.src);
  }
});

// Verificar dataLayer do GTM
console.log('\n\n📊 VERIFICANDO DATALAYER DO GTM:');
if (typeof window.dataLayer !== 'undefined') {
  console.log('   dataLayer encontrado com', window.dataLayer.length, 'eventos');
  // Procurar por eventos relacionados ao pixel antigo
  window.dataLayer.forEach((event, index) => {
    if (JSON.stringify(event).includes('2425136197757628')) {
      console.log(`   🚨 Evento #${index} com pixel antigo:`, event);
    }
  });
} else {
  console.log('   ❌ dataLayer não encontrado');
}

console.log('\n\n✅ Análise concluída!');

