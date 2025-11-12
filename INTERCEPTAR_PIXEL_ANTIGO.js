/**
 * Script para interceptar e identificar origem do pixel antigo
 * 
 * INSTRUÇÕES:
 * 1. Abra o DevTools (F12)
 * 2. Vá na aba "Sources" (Fontes)
 * 3. Clique em "Snippets" (Trechos) no painel esquerdo
 * 4. Clique com botão direito > "New snippet"
 * 5. Cole este código
 * 6. Salve (Ctrl+S)
 * 7. Clique com botão direito no snippet > "Run" (ou pressione Ctrl+Enter)
 * 8. Recarregue a página (F5)
 */

// Interceptar ANTES de qualquer script carregar
(function() {
  console.log('🔍 Interceptador de Pixel iniciado...');
  
  // Interceptar window.fbq ANTES de ser definido
  const originalFbq = window.fbq;
  
  // Criar um proxy para capturar todas as chamadas
  window.fbq = function() {
    const args = Array.from(arguments);
    
    // Verificar se é inicialização do pixel antigo
    if (args[0] === 'init' && args[1] === '2425136197757628') {
      console.error('🚨🚨🚨 PIXEL ANTIGO ENCONTRADO! 🚨🚨🚨');
      console.error('Pixel ID:', args[1]);
      console.error('Argumentos completos:', args);
      console.trace('📍 Stack trace completo (de onde veio):');
      
      // Pausar o código aqui para investigar
      debugger;
      
      // Não executar o pixel antigo
      return;
    }
    
    // Verificar se é inicialização do pixel novo (para detectar duplicação)
    if (args[0] === 'init' && args[1] === '955607049895742') {
      console.warn('✅ Pixel NOVO detectado:', args[1]);
      console.trace('📍 Stack trace (de onde veio):');
    }
    
    // Executar normalmente para outros pixels
    if (originalFbq) {
      return originalFbq.apply(this, arguments);
    }
  };
  
  // Interceptar também a criação do script fbevents.js
  const originalCreateElement = document.createElement;
  document.createElement = function(tagName) {
    const element = originalCreateElement.call(this, tagName);
    
    if (tagName.toLowerCase() === 'script') {
      const originalSetAttribute = element.setAttribute;
      element.setAttribute = function(name, value) {
        if (name === 'src' && typeof value === 'string') {
          // Verificar se é o script do Facebook
          if (value.includes('fbevents.js') || value.includes('facebook.net')) {
            console.log('📜 Script do Facebook sendo carregado:', value);
            console.trace('📍 De onde veio:');
          }
          
          // Verificar se contém o pixel antigo
          if (value.includes('2425136197757628')) {
            console.error('🚨🚨🚨 SCRIPT COM PIXEL ANTIGO ENCONTRADO! 🚨🚨🚨');
            console.error('URL do script:', value);
            console.trace('📍 Stack trace completo:');
            debugger;
          }
        }
        return originalSetAttribute.call(this, name, value);
      };
    }
    
    return element;
  };
  
  console.log('✅ Interceptador configurado. Recarregue a página.');
})();

