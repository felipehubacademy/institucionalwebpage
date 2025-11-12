# 🐛 Debug - Notificação Sales Rep não está funcionando

## Verificações Rápidas

### 1. Verificar Variável de Ambiente no Vercel

1. Acesse: https://vercel.com
2. Seu projeto > Settings > Environment Variables
3. Verifique se `SALES_REP_WHATSAPP_PHONE` está configurada:
   - **Name:** `SALES_REP_WHATSAPP_PHONE`
   - **Value:** `5511990239079` (sem espaços, sem +)
   - **Environment:** Production (marque pelo menos Production)

### 2. Verificar Logs do Vercel

1. Acesse: https://vercel.com
2. Seu projeto > Deployments
3. Clique no último deployment
4. Vá em "Functions" > `/api/lead`
5. Veja os logs quando um lead é cadastrado
6. Procure por:
   - `"Sales rep notification sent successfully"` ✅
   - `"Sales rep notification error:"` ❌
   - `"SALES_REP_WHATSAPP_PHONE not configured"` ⚠️

### 3. Verificar Template no WhatsApp

1. Acesse: https://business.facebook.com/wa/manage/message-templates/
2. Verifique se o template `novo_lead_notificacao_v2` está:
   - [ ] Aprovado (status: APPROVED)
   - [ ] Não está pausado
   - [ ] Idioma: pt_BR

### 4. Testar Manualmente via API

Execute o script de teste:

```bash
node test-sales-rep-notification.js
```

Isso vai enviar uma mensagem de teste diretamente para o sales rep.

### 5. Verificar Código no Vercel

O código deve estar assim em `app/api/lead/route.ts`:

```typescript
const salesRepPhone = process.env.SALES_REP_WHATSAPP_PHONE

if (salesRepPhone) {
  try {
    await sendSalesRepNotification(...)
    console.log("Sales rep notification sent successfully")
  } catch (salesRepError) {
    console.error("Sales rep notification error:", salesRepError)
  }
} else {
  console.warn("SALES_REP_WHATSAPP_PHONE not configured")
}
```

## Problemas Comuns

### Problema 1: Variável não está sendo lida

**Sintoma:** Logs mostram "SALES_REP_WHATSAPP_PHONE not configured"

**Solução:**
1. Verifique se a variável está escrita exatamente: `SALES_REP_WHATSAPP_PHONE`
2. Verifique se está marcada para Production
3. Faça um novo deploy após adicionar a variável

### Problema 2: Template não está aprovado

**Sintoma:** Logs mostram erro de template não encontrado

**Solução:**
1. Verifique se o template `novo_lead_notificacao_v2` está aprovado
2. Se não estiver, aguarde aprovação ou use outro template aprovado

### Problema 3: Erro silencioso

**Sintoma:** Não aparece nada nos logs

**Solução:**
1. Verifique os logs completos do Vercel
2. Procure por erros relacionados ao WhatsApp API

## Próximos Passos

1. Verifique os logs do Vercel primeiro
2. Me diga o que aparece nos logs quando um lead é cadastrado
3. Execute o script de teste manual para verificar se o template funciona

