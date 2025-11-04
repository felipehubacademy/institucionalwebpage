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
    url: "https://hubacademybr.com/assessment",
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

// JSON-LD FAQPage Schema
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

export default function AssessmentPage() {
  return (
    <>
      {/* JSON-LD FAQPage Schema */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Meta Pixel (opcional) */}
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
              src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      {/* LinkedIn Insight Tag (opcional) */}
      {process.env.NEXT_PUBLIC_LINKEDIN_PID && (
        <>
          <Script
            id="linkedin-insight"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                _linkedin_partner_id = "${process.env.NEXT_PUBLIC_LINKEDIN_PID}";
                window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              `,
            }}
          />
          <Script
            id="linkedin-script"
            strategy="afterInteractive"
            src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
          />
        </>
      )}

      {/* Tracking GTM - page_view será disparado automaticamente pelo GTM já configurado no layout */}
      <Script
        id="tracking-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window.dataLayer !== 'undefined') {
              window.dataLayer.push({
                event: 'page_view',
                page_title: 'Assessment de Inglês (Gratuito)',
                page_location: window.location.href,
              });
            }
          `,
        }}
      />

      <HubAssessmentLanding />
    </>
  )
}

