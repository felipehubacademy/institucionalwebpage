# Template de WhatsApp para Assessment

## Template Criado

**Nome:** `assessment_confirmacao`  
**Categoria:** MARKETING  
**Idioma:** pt_BR

### Mensagem:
```
Olá, {{1}}, recebemos seu interesse no Assessment Gratuito da Hub Academy! Em breve alguém do nosso time entrará em contato para agendar sua conversa 1:1 com um expert. Aguarde nosso retorno! 🚀
```

**Rodapé:** Hub Academy

## Como Criar o Template

### Opção 1: Via Meta Business Suite (Recomendado)

1. Acesse: https://business.facebook.com/wa/manage/message-templates/
2. Clique em "Criar template"
3. Preencha:
   - **Nome:** `assessment_confirmacao`
   - **Categoria:** Marketing
   - **Idioma:** Português (Brasil)
4. No corpo da mensagem, adicione:
   ```
   Olá, {{1}}, recebemos seu interesse no Assessment Gratuito da Hub Academy! Em breve alguém do nosso time entrará em contato para agendar sua conversa 1:1 com um expert. Aguarde nosso retorno! 🚀
   ```
5. Configure a variável `{{1}}` como Nome (primeiro nome)
6. Adicione rodapé: "Hub Academy"
7. Salve e aguarde aprovação (pode levar alguns minutos)

### Opção 2: Via API (Script)

Execute o script:
```bash
node scripts/create-whatsapp-template.js
```

**Nota:** Você precisa configurar `WHATSAPP_BUSINESS_ACCOUNT_ID` no `.env.local`

## Verificação

Após criar o template, verifique se está aprovado:
- Meta Business Suite: https://business.facebook.com/wa/manage/message-templates/
- Status deve estar como "Aprovado" (verde)

## Uso

O template será usado automaticamente quando um lead se cadastrar no formulário de Assessment.

O código já está configurado para usar o template `assessment_confirmacao` em `app/api/lead/route.ts`.

