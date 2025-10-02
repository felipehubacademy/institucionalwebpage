# 🔌 Guia de Configuração das APIs - English Night Live Meetup

## 📝 Passo a Passo para Configurar as Integrações

### 1️⃣ **HubSpot CRM API**

#### Como obter as credenciais:

1. **Acesse:** https://app.hubspot.com/settings/integrations/private-apps
2. **Crie um Private App:**
   - Nome: "Hub Academy Meetup Integration"
   - Descrição: "API para registro de eventos"
3. **Adicione os seguintes scopes:**
   - `crm.objects.contacts.read`
   - `crm.objects.contacts.write`
   - `crm.objects.deals.read`
   - `crm.objects.deals.write`
4. **Gere o token** e copie (aparece apenas uma vez!)

#### Configurar Pipeline e Deal Stage:

1. **Pipeline ID:**
   - Vá em: Settings → Objects → Deals → Pipelines
   - Copie o ID do pipeline que deseja usar (ex: `default`)

2. **Deal Stage ID:**
   - Dentro do pipeline escolhido, copie o ID do estágio
   - Exemplo: `appointmentscheduled` (para eventos marcados)

#### Variáveis no `.env.local`:
```env
HUBSPOT_API_KEY=pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
HUBSPOT_MEETUP_PIPELINE=default
HUBSPOT_MEETUP_DEALSTAGE=appointmentscheduled
```

---

### 2️⃣ **WhatsApp Cloud API (Meta Business)**

#### Como obter as credenciais:

1. **Acesse:** https://developers.facebook.com/apps/
2. **Crie ou selecione um app** → Adicione produto "WhatsApp"
3. **Configure WhatsApp Business:**
   - Vá em WhatsApp → API Setup
   - Copie o **Phone Number ID** (começa com números)
   - Copie o **Access Token** temporário

4. **Para Production (Token Permanente):**
   - Crie um System User no Business Manager
   - Gere um token permanente com scopes:
     - `whatsapp_business_messaging`
     - `whatsapp_business_management`

#### Variáveis no `.env.local`:
```env
WHATSAPP_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxxxxxx
WHATSAPP_PHONE_NUMBER_ID=123456789012345
```

#### Teste rápido:
```bash
curl -X POST "https://graph.facebook.com/v18.0/PHONE_NUMBER_ID/messages" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "messaging_product": "whatsapp",
    "to": "5511999999999",
    "type": "text",
    "text": {"body": "Teste de mensagem"}
  }'
```

---

### 3️⃣ **Microsoft Graph API (Email)**

#### Como obter as credenciais:

1. **Acesse:** https://portal.azure.com/
2. **Azure Active Directory** → App registrations → New registration
3. **Configure o app:**
   - Nome: "Hub Academy Email Integration"
   - Supported account types: Single tenant
   - Redirect URI: (não necessário para server-to-server)

4. **API Permissions:**
   - Add permission → Microsoft Graph → Application permissions
   - Adicione: `Mail.Send`
   - Click "Grant admin consent"

5. **Certificates & secrets:**
   - New client secret
   - Copie o **Value** (aparece apenas uma vez!)

6. **Gere o Access Token:**
   
   **Método 1: Client Credentials Flow (Recomendado para produção)**
   ```bash
   curl -X POST "https://login.microsoftonline.com/TENANT_ID/oauth2/v2.0/token" \
     -d "client_id=CLIENT_ID" \
     -d "client_secret=CLIENT_SECRET" \
     -d "scope=https://graph.microsoft.com/.default" \
     -d "grant_type=client_credentials"
   ```

   **Método 2: Delegated Flow (para testes)**
   - Use o Graph Explorer: https://developer.microsoft.com/en-us/graph/graph-explorer

7. **Importante:** O token expira! Para produção, implemente refresh automático.

#### Variáveis no `.env.local`:
```env
MS_GRAPH_ACCESS_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6...
MS_GRAPH_FROM_EMAIL=contato@hubacademybr.com
```

---

## 🚀 Configuração Final

### Crie o arquivo `.env.local` na raiz do projeto:

```bash
cd /Users/felipexavier/Library/CloudStorage/OneDrive-HubAcademy/Apps/institucionalwebpage
touch .env.local
```

### Cole o seguinte conteúdo (com suas credenciais):

```env
# HubSpot CRM API
HUBSPOT_API_KEY=pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
HUBSPOT_MEETUP_PIPELINE=default
HUBSPOT_MEETUP_DEALSTAGE=appointmentscheduled

# WhatsApp Cloud API
WHATSAPP_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxxxxxx
WHATSAPP_PHONE_NUMBER_ID=123456789012345

# Microsoft Graph API
MS_GRAPH_ACCESS_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6...
MS_GRAPH_FROM_EMAIL=contato@hubacademybr.com
```

---

## 🧪 Testando as Integrações

### 1. Reinicie o servidor:
```bash
npm run dev
```

### 2. Teste o formulário:
```bash
curl -X POST http://localhost:3000/api/register-meetup \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "Teste",
    "lastname": "API",
    "email": "teste@example.com",
    "phone": "+5511999999999",
    "english_level": "Intermediário",
    "lgpdConsent": true
  }'
```

### 3. Verifique os logs no terminal:
```
✅ HubSpot: Contact created, deal created
✅ WhatsApp message sent successfully
✅ Confirmation email sent successfully
```

---

## ⚠️ Troubleshooting

### HubSpot
**Erro:** "Failed to create contact"
**Solução:** Verifique se a API key tem os scopes corretos

**Erro:** "Property X doesn't exist"
**Solução:** Crie a propriedade customizada no HubSpot (ex: `english_level`)

### WhatsApp
**Erro:** "Phone number not registered"
**Solução:** O número precisa estar verificado no WhatsApp Business

**Erro:** "Template not found"
**Solução:** Estamos usando mensagens de texto livre (funciona apenas em 24h após contato do usuário)

### Microsoft Graph
**Erro:** "Token expired"
**Solução:** Tokens expiram em 1h. Implemente refresh ou use service account

**Erro:** "Insufficient privileges"
**Solução:** Verifique se deu "Grant admin consent" nas permissions

---

## 🔒 Segurança

**NUNCA** commite o arquivo `.env.local`! 

Ele já está no `.gitignore`:
```
.env*
```

Para produção na Vercel:
1. Vá em: Project Settings → Environment Variables
2. Adicione cada variável individualmente
3. Marque para qual ambiente (Production/Preview/Development)

---

## 📊 Monitoramento

Após configurar, monitore os logs do servidor para ver:
- ✅ Sucesso nas integrações
- ⚠️ Falhas parciais (não impedem o registro)
- ❌ Erros críticos

O sistema foi projetado para ser **fault-tolerant**: se uma integração falhar, as outras continuam funcionando.

---

## 🆘 Suporte

Precisa de ajuda com alguma integração específica? Me avise qual e podemos configurar juntos!

