# 📱 Como Criar o Template de WhatsApp para Assessment

## Passo a Passo

### 1. Acesse o Meta Business Suite
👉 https://business.facebook.com/wa/manage/message-templates/

### 2. Clique em "Criar Template"

### 3. Preencha os dados:

**Nome do Template:**
```
assessment_confirmacao
```

**Categoria:**
```
Marketing
```

**Idioma:**
```
Português (Brasil) - pt_BR
```

### 4. Configure o Corpo da Mensagem:

**Texto:**
```
Olá, {{1}}, recebemos seu interesse no Assessment Gratuito da Hub Academy! Em breve alguém do nosso time entrará em contato para agendar sua conversa 1:1 com um expert. Aguarde nosso retorno! 🚀
```

**Variável {{1}}:**
- ⚠️ **IMPORTANTE:** Tipo: **Número** (não texto!)
- Nome: Nome do usuário (primeiro nome)
- Exemplo: João
- **Nota:** Mesmo sendo um nome, o WhatsApp pode exigir tipo "Número" para aceitar a variável {{1}}

### 5. Configure o Rodapé:

**Texto:**
```
Hub Academy
```

### 6. Salve e Aguarde Aprovação

- O template será enviado para aprovação do WhatsApp
- Pode levar alguns minutos ou horas para ser aprovado
- Você receberá uma notificação quando estiver aprovado

## ✅ Verificação

Após criar, verifique se:
- Nome: `assessment_confirmacao`
- Status: **Aprovado** (verde)
- Idioma: pt_BR
- Categoria: Marketing

## 🚀 Pronto!

Quando o template estiver aprovado, ele será usado automaticamente quando alguém se cadastrar no formulário de Assessment.

O código já está configurado para usar o template `assessment_confirmacao` em `app/api/lead/route.ts`.

