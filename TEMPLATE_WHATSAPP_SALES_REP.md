# 📱 Template de WhatsApp para Notificação do Sales Rep

## Template: `novo_lead_notificacao_v2`

### Categoria
**MARKETING** (reclassificado automaticamente pelo WhatsApp)

### Idioma
**pt_BR** (Português do Brasil)

### Nome do Template
```
novo_lead_notificacao
```

### Conteúdo da Mensagem

**Corpo da mensagem:**
```
🔥 Bora vender!

Novo lead no Assessment:

👤 {{1}}

📱 {{2}}

💰 Foco no Futuro!
```

**Variáveis:**
- `{{1}}` - Nome completo do lead (Tipo: **Text**)
- `{{2}}` - Telefone do lead completo com + (Tipo: **Text** - ex: +5511987654321)

**Nota:** O número será enviado no formato `+5511987654321` para que o WhatsApp reconheça automaticamente como número clicável. Não é necessário botão - o WhatsApp transforma números no formato internacional em links clicáveis automaticamente.

### Exemplo de Mensagem Enviada

```
🔥 Bora vender!

Novo lead no Assessment:

👤 João Silva

📱 +5511987654321

💰 Foco no Futuro!
```

**Nota:** O número `+5511987654321` será automaticamente reconhecido pelo WhatsApp como clicável, permitindo iniciar uma conversa diretamente.

## Como Criar o Template

### Via Meta Business Suite (Recomendado)

1. Acesse: https://business.facebook.com
2. Vá em **Ferramentas de Negócios** > **WhatsApp** > **Gerenciador de Mensagens**
3. Clique em **Templates de Mensagem**
4. Clique em **Criar Template**
5. Preencha:
   - **Nome:** `novo_lead_notificacao_v2`
   - **Categoria:** Marketing (será reclassificado automaticamente se necessário)
   - **Idioma:** Português (Brasil)
6. No corpo da mensagem, adicione:
   ```
   🔥 Bora vender!
   
   Novo lead no Assessment:
   
   👤 {{1}}
   
   📱 {{2}}
   
   💰 Foco no Futuro!
   ```
7. Adicione variáveis:
   - `{{1}}` - Tipo: **Text** (Nome do lead)
   - `{{2}}` - Tipo: **Text** (Telefone do lead completo com +, ex: +5511987654321)
8. **Não adicione botão** - O número será automaticamente reconhecido como clicável pelo WhatsApp
9. Envie para aprovação

### Via API (Script)

Execute o script para criar via API:

```bash
node scripts/create-whatsapp-template-sales-rep.js
```

## Variáveis de Ambiente Necessárias

Adicione no `.env.local`:

```env
# Número do WhatsApp do Sales Rep (formato: 5511990239079)
SALES_REP_WHATSAPP_PHONE=5511990239079
```

## Notas Importantes

1. **Aprovação:** O template precisa ser aprovado pelo WhatsApp antes de ser usado
2. **Formato do Telefone:** O telefone será formatado automaticamente para exibição (ex: (11) 98765-4321)
3. **Botão WhatsApp:** O botão criará um link direto para iniciar conversa no WhatsApp com o número do lead
4. **Fallback:** Se o botão não funcionar, o número do lead estará visível no corpo da mensagem

