# Landing Page de Assessment - Hub Academy

## Instalação de Dependências

Execute o seguinte comando para instalar as dependências necessárias:

```bash
npm install zod @hubspot/api-client
# ou
pnpm add zod @hubspot/api-client
```

## Configuração de Variáveis de Ambiente

1. Copie o arquivo `.env.local.example` para `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Preencha as variáveis de ambiente:

### HubSpot Configuration

**Importante:** O projeto já usa HubSpot no meetup. As variáveis já estão deployadas:
- `HUBSPOT_PRIVATE_APP_TOKEN` - Reutilize o mesmo token já configurado

**Nota:** O meetup usa Forms API (client-side), enquanto o assessment usa Private App API (server-side) para criar deals e fazer upsert de contatos. Ambos compartilham o mesmo `HUBSPOT_PRIVATE_APP_TOKEN`.

#### Obter Pipeline e Deal Stage IDs:
1. Acesse HubSpot > Sales > Deals > Pipelines
2. Selecione o pipeline desejado (ou crie um novo)
3. Clique em "View pipeline details"
4. O Pipeline ID estará na URL ou nas configurações
5. Para o Deal Stage ID, selecione o estágio inicial do pipeline e copie o ID

**Exemplo de como encontrar os IDs:**
- Pipeline ID: geralmente um número como `default` ou `12345678`
- Deal Stage ID: geralmente algo como `appointmentscheduled` ou um número

### Campos Customizados no HubSpot

Você precisará criar os seguintes campos customizados no HubSpot:

1. **hub_level** (Contact Property)
   - Tipo: Single-line text
   - Label: "Nível de Inglês"
   - Internal name: `hub_level`

2. **preferred_time** (Contact Property)
   - Tipo: Single-line text
   - Label: "Melhor Horário"
   - Internal name: `preferred_time`

3. **lgpd_consent** (Contact Property)
   - Tipo: Checkbox
   - Label: "Consentimento LGPD"
   - Internal name: `lgpd_consent`

**Nota:** Os nomes dos campos podem precisar ser ajustados no arquivo `lib/hubspot/client.ts` conforme a configuração real do seu HubSpot.

### WhatsApp URL

Configure a URL do WhatsApp com a mensagem pré-formatada:
```
NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/551152865668?text=Olá%20Hub!%20Quero%20agendar%20meu%20assessment.
```

### Tracking (Opcional)

- **GTM ID**: Se usar Google Tag Manager, adicione o ID (ex: `GTM-XXXXXXX`)
- **Meta Pixel**: Se usar Meta Pixel, adicione o ID
- **LinkedIn PID**: Se usar LinkedIn Insight Tag, adicione o Partner ID

## Estrutura de Arquivos Criados

```
app/
  ├── page.tsx                    # Landing page principal (PRECISA SER CRIADO)
  ├── obrigado/
  │   └── page.tsx                # Página de agradecimento
  └── api/
      └── lead/
          └── route.ts            # Endpoint POST /api/lead

components/
  ├── assessment-landing.tsx     # Componente principal da landing
  └── video-modal.tsx             # Modal de vídeo placeholder

lib/
  ├── validations/
  │   └── lead.ts                 # Schema Zod de validação
  ├── hubspot/
  │   └── client.ts               # Cliente HubSpot
  └── rate-limit.ts               # Rate limiting

types/
  └── global.d.ts                # Declarações de tipos globais
```

## IMPORTANTE: Criar app/page.tsx

O arquivo `app/page.tsx` precisa ser criado manualmente. Use o seguinte conteúdo:

```typescript
import HubAssessmentLanding from "@/components/assessment-landing"
import type { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Assessment de Inglês (Gratuito) – Hub Academy",
  description:
    "Converse 1:1 com um expert, descubra seu nível e mapeie como avançar com segurança no trabalho.",
  keywords: [
    "assessment inglês gratuito",
    "teste de inglês",
    "avaliação de inglês",
    "curso de inglês profissional",
    "inglês para negócios",
    "hub academy",
  ],
  openGraph: {
    title: "Assessment de Inglês (Gratuito) – Hub Academy",
    description:
      "Converse 1:1 com um expert, descubra seu nível e mapeie como avançar com segurança no trabalho.",
    url: "https://hubacademybr.com",
    siteName: "Hub Academy",
    images: [
      {
        url: "/images/hub-academy-og.png",
        width: 1200,
        height: 630,
        alt: "Hub Academy - Assessment de Inglês Gratuito",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Assessment de Inglês (Gratuito) – Hub Academy",
    description:
      "Converse 1:1 com um expert, descubra seu nível e mapeie como avançar com segurança no trabalho.",
    images: ["/images/hub-academy-og.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quanto tempo dura o assessment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Entre 30 e 40 minutos, totalmente 1:1 com um expert da Hub.",
      },
    },
    {
      "@type": "Question",
      name: "É realmente gratuito?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. É uma experiência de valor para você sair com diagnóstico e próximos passos.",
      },
    },
    {
      "@type": "Question",
      name: "Meu nível é B1. Isso serve para mim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim — especialmente para quem entende, mas trava para se comunicar no trabalho.",
      },
    },
    {
      "@type": "Question",
      name: "E se eu for iniciante?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Também funciona. O expert adapta a conversa e te entrega um plano de evolução.",
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {process.env.NEXT_PUBLIC_META_PIXEL && (
        <>
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL}');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={\`https://www.facebook.com/tr?id=\${process.env.NEXT_PUBLIC_META_PIXEL}&ev=PageView&noscript=1\`}
              alt=""
            />
          </noscript>
        </>
      )}
      {process.env.NEXT_PUBLIC_LINKEDIN_PID && (
        <>
          <Script
            id="linkedin-insight"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: \`
                _linkedin_partner_id = "\${process.env.NEXT_PUBLIC_LINKEDIN_PID}";
                window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              \`,
            }}
          />
          <Script
            id="linkedin-script"
            strategy="afterInteractive"
            src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
          />
        </>
      )}
      <Script
        id="tracking-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: \`
            if (typeof window.dataLayer !== 'undefined') {
              window.dataLayer.push({
                event: 'page_view',
                page_title: 'Assessment de Inglês (Gratuito)',
                page_location: window.location.href,
              });
            }
          \`,
        }}
      />
      <HubAssessmentLanding />
    </>
  )
}
```

## Deploy na Vercel

1. Faça push do código para seu repositório Git
2. Conecte o repositório na Vercel
3. Configure as variáveis de ambiente na Vercel:
   - Vá em Settings > Environment Variables
   - Adicione todas as variáveis do `.env.local`
4. Deploy automático será feito

## Testes

### Testar Formulário
1. Acesse `/` (landing page)
2. Preencha o formulário com dados válidos
3. Verifique se redireciona para `/obrigado`
4. Verifique no HubSpot se o contato foi criado/atualizado
5. Verifique se o Deal foi criado no pipeline correto

### Testar Validações
- Tente enviar sem consentimento → deve mostrar erro
- Tente enviar com email inválido → deve mostrar erro
- Tente enviar mais de 10 vezes → deve bloquear (rate limit)

### Testar UTMs
- Acesse `/?utm_source=ads&utm_medium=meta&utm_campaign=test`
- Envie o formulário
- Verifique no HubSpot se os UTMs foram salvos

### Testar Tracking
- Verifique no GTM/Meta/LinkedIn se os eventos estão sendo disparados
- Evento `page_view` na landing
- Evento `generate_lead` após envio bem-sucedido

## Troubleshooting

### Erro ao criar contato no HubSpot
- Verifique se o Private App Token está correto
- Verifique se as permissões estão configuradas corretamente
- Verifique os logs do servidor para detalhes do erro

### Campos customizados não aparecem
- Verifique se os campos foram criados no HubSpot
- Verifique se os nomes internos estão corretos em `lib/hubspot/client.ts`
- Os campos podem precisar ser ajustados conforme sua configuração

### Rate limiting não funciona
- A implementação atual é in-memory (perde estado em restart)
- Para produção, considere usar Upstash Redis (instruções no código)

### reCAPTCHA não implementado
- O stub está pronto no código
- Para implementar, siga os comentários em `app/api/lead/route.ts`

## Próximos Passos (Backlog)

- [ ] Implementar e-mail de confirmação (Resend/SendGrid)
- [ ] Salvar leads em planilha (BigQuery/Sheets)
- [ ] A/B testing de headlines
- [ ] Implementar reCAPTCHA v3
- [ ] Migrar rate limiting para Upstash Redis

