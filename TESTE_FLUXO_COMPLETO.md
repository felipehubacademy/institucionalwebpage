# 🧪 Guia de Teste - Fluxo Completo do Assessment

## 📋 Checklist de Teste

### 1. Preparação
- [ ] Abrir DevTools (F12) - aba Network e Console
- [ ] Abrir Meta Pixel Helper (extensão do Chrome)
- [ ] Abrir Google Tag Assistant (Preview Mode do GTM)
- [ ] Ter acesso ao HubSpot aberto
- [ ] Ter WhatsApp aberto (número do lead e do sales rep)

### 2. Preencher o Formulário em `/assessment`

**Dados de teste:**
- Nome: Felipe
- Sobrenome: Xavier
- Email: felipe.teste@hubacademybr.com
- Telefone: +55 11 97822-9898
- Empresa: Hub Academy
- Cargo: CEO
- Melhor horário: Manhã
- Consentimento: ✅ Marcar checkbox

### 3. Verificações Durante o Envio

#### 3.1 Meta Pixel (DevTools > Network)
- [ ] Filtrar por: `955607049895742`
- [ ] Verificar requisição `PageView` (deve aparecer)
- [ ] Após redirecionar para `/obrigado`, verificar requisição `Lead` (deve aparecer)

#### 3.2 Meta Pixel Helper
- [ ] Na página `/assessment`: Deve mostrar pixel `955607049895742` com evento `PageView`
- [ ] Na página `/obrigado`: Deve mostrar pixel `955607049895742` com evento `Lead`

#### 3.3 Google Tag Manager (Tag Assistant)
- [ ] Verificar tags disparadas:
  - [ ] `Meta Pixel - PageView` (deve disparar)
  - [ ] `FB_CONVERSIONS_API-955607049895742-Web-Tag-Pixel_Setup` (deve disparar)
  - [ ] `Meta Pixel - Lead (Página Obrigado)` (deve disparar na página `/obrigado`)

#### 3.4 Console do DevTools
- [ ] Verificar se há erros no console
- [ ] Verificar se `dataLayer` está sendo populado corretamente

### 4. Verificações no HubSpot

#### 4.1 Contato Criado/Atualizado
- [ ] Acessar HubSpot > Contatos
- [ ] Buscar por: `felipe.teste@hubacademybr.com`
- [ ] Verificar propriedades:
  - [ ] Nome: Felipe Xavier
  - [ ] Email: felipe.teste@hubacademybr.com
  - [ ] Telefone: +5511978229898
  - [ ] Empresa: Hub Academy
  - [ ] Cargo: CEO
  - [ ] Melhor horário: Manhã
  - [ ] Lead Status: Novo
  - [ ] Origem: Form Assessment
  - [ ] Owner: Marco (83528823)
  - [ ] Lifecycle Stage: lead

#### 4.2 Deal Criado
- [ ] Acessar HubSpot > Deals
- [ ] Buscar por: `Assessment – Felipe Xavier`
- [ ] Verificar propriedades:
  - [ ] Nome: Assessment – Felipe Xavier – Hub Academy
  - [ ] Pipeline: Pipeline padrão
  - [ ] Stage: Stage padrão
  - [ ] Owner: Marco (83528823)
  - [ ] Associado ao contato correto

### 5. Verificações WhatsApp

#### 5.1 Mensagem para o Lead
- [ ] Verificar WhatsApp do número: `+5511978229898`
- [ ] Deve receber mensagem do template: `assessment_confirmacao`
- [ ] Mensagem deve conter: "Olá, Felipe, recebemos seu interesse..."

#### 5.2 Mensagem para o Sales Rep
- [ ] Verificar WhatsApp do número: `+5511990239079`
- [ ] Deve receber mensagem do template: `novo_lead_notificacao_v2`
- [ ] Mensagem deve conter:
  - [ ] "🔥 Bora vender!"
  - [ ] Nome: Felipe
  - [ ] Telefone: +5511978229898 (clicável)
  - [ ] "💰 Foco no Futuro!"

### 6. Verificações no Meta Business Manager

#### 6.1 Eventos Recebidos
- [ ] Acessar: https://business.facebook.com/events_manager2
- [ ] Selecionar pixel: `955607049895742`
- [ ] Ir em "Testar eventos"
- [ ] Verificar eventos recebidos:
  - [ ] `PageView` (deve aparecer)
  - [ ] `Lead` (deve aparecer na página `/obrigado`)

### 7. Verificações Finais

- [ ] Redirecionamento: Deve redirecionar para `/obrigado` após envio
- [ ] Página `/obrigado`: Deve carregar corretamente
- [ ] Sem erros no console do navegador
- [ ] Todas as requisições HTTP retornaram status 200/201

## 🐛 Problemas Comuns

### Se a mensagem para o lead não chegar:
- Verificar se `WHATSAPP_ACCESS_TOKEN` e `WHATSAPP_PHONE_NUMBER_ID` estão configurados
- Verificar se o template `assessment_confirmacao` está aprovado

### Se a mensagem para o sales rep não chegar:
- Verificar se `SALES_REP_WHATSAPP_PHONE` está configurado
- Verificar se o template `novo_lead_notificacao_v2` está aprovado

### Se o evento Lead não disparar:
- Verificar se está na página `/obrigado`
- Verificar se a tag "Meta Pixel - Lead" está ativa no GTM
- Verificar se o trigger está configurado corretamente

### Se o contato não for criado no HubSpot:
- Verificar logs do servidor (console do terminal onde está rodando `npm run dev`)
- Verificar se `HUBSPOT_API_KEY` está configurado corretamente

## ✅ Resultado Esperado

Após preencher o formulário, você deve ver:

1. ✅ Redirecionamento para `/obrigado`
2. ✅ Evento `PageView` no Meta Pixel
3. ✅ Evento `Lead` no Meta Pixel (na página `/obrigado`)
4. ✅ Contato criado/atualizado no HubSpot
5. ✅ Deal criado no HubSpot
6. ✅ Mensagem WhatsApp para o lead
7. ✅ Mensagem WhatsApp para o sales rep

---

**Boa sorte com o teste! 🚀**

