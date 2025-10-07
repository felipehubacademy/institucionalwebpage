/**
 * Email templates for meetup reminders
 */

interface Contact {
  firstname: string
  lastname: string
  email: string
}

interface EmailTemplate {
  subject: string
  html: string
}

export function generateReminderEmail(
  type: 'd7' | 'd3' | 'd1' | 'followup',
  contact: Contact
): EmailTemplate {
  const templates = {
    d7: {
      subject: '🗓️ Faltam 7 dias para o English Night Live!',
      html: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Faltam 7 dias - English Night Live</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #161533; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #a3ff3c; margin: 0; font-size: 28px;">🗓️ Faltam 7 dias!</h1>
    <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 18px;">English Night Live</p>
  </div>
  
  <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #161533; margin-top: 0;">Olá, ${contact.firstname}!</h2>
    
    <p style="font-size: 16px;">
      O <strong>English Night Live</strong> está chegando! 🚀
    </p>
    
    <div style="background-color: #ffffff; border-left: 4px solid #a3ff3c; padding: 20px; margin: 25px 0; border-radius: 5px;">
      <h3 style="color: #161533; margin-top: 0;">📅 Detalhes do Evento</h3>
      <p style="margin: 10px 0;"><strong>Data:</strong> 22 de Outubro de 2025 (quarta-feira)</p>
      <p style="margin: 10px 0;"><strong>Horário:</strong> 18h30 às 22h</p>
      <p style="margin: 10px 0;"><strong>Local:</strong> Av. Paulista, 1374 - 12º andar<br>Brazilian Financial Center</p>
    </div>
    
    <h3 style="color: #161533;">✨ O que você vai vivenciar:</h3>
    <ul style="padding-left: 20px; margin: 10px 0;">
      <li>Prática de inglês em dinâmicas reais de negócios</li>
      <li>Desenvolvimento de soft skills estratégicas</li>
      <li>Networking com profissionais de diversas áreas</li>
    </ul>
    
    <h3 style="color: #161533;">🎒 O que levar:</h3>
    <ul style="padding-left: 20px; margin: 10px 0;">
      <li>✅ Disposição para praticar inglês</li>
      <li>✅ Mente aberta para novas conexões</li>
    </ul>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=English+Night+Live+-+Hub+Academy&dates=20251022T213000Z/20251023T010000Z&details=MeetUP+imersivo+da+Hub+Academy&location=Av.+Paulista%2C+1374+-+12%C2%BA+andar+-+S%C3%A3o+Paulo" 
         style="display: inline-block; background-color: #a3ff3c; color: #161533; padding: 15px 40px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px;">
        Adicionar ao Calendário
      </a>
    </div>
    
    <p style="font-size: 14px; color: #666; margin-top: 30px;">
      Qualquer dúvida, entre em contato conosco pelo e-mail 
      <a href="mailto:hub@hubacademybr.com" style="color: #161533;">hub@hubacademybr.com</a>
    </p>
    
    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
    
    <p style="font-size: 12px; color: #999; text-align: center;">
      © ${new Date().getFullYear()} Hub Academy. Todos os direitos reservados.
    </p>
  </div>
</body>
</html>
      `.trim()
    },

    d3: {
      subject: '⏰ Em poucos dias - English Night Live',
      html: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Em poucos dias - English Night Live</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #161533; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #a3ff3c; margin: 0; font-size: 28px;">⏰ Em poucos dias!</h1>
    <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 18px;">English Night Live</p>
  </div>
  
  <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #161533; margin-top: 0;">Olá, ${contact.firstname}!</h2>
    
    <p style="font-size: 16px;">
      Lembrando do <strong>English Night Live</strong>:
    </p>
    
    <div style="background-color: #ffffff; border-left: 4px solid #a3ff3c; padding: 20px; margin: 25px 0; border-radius: 5px;">
      <h3 style="color: #161533; margin-top: 0;">📅 Quando e Onde</h3>
      <p style="margin: 10px 0;"><strong>Data:</strong> 22 de Outubro (quarta-feira)</p>
      <p style="margin: 10px 0;"><strong>Horário:</strong> 18h30</p>
      <p style="margin: 10px 0;"><strong>Local:</strong> Av. Paulista, 1374 - 12º andar<br>Brazilian Financial Center</p>
      <p style="margin: 10px 0;"><strong>Metrô:</strong> Trianon-MASP (Linha Verde)</p>
    </div>
    
    <p style="font-size: 16px;">
      Te esperamos para uma noite de networking e prática de inglês! 💬
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=English+Night+Live+-+Hub+Academy&dates=20251022T213000Z/20251023T010000Z&details=MeetUP+imersivo+da+Hub+Academy&location=Av.+Paulista%2C+1374+-+12%C2%BA+andar+-+S%C3%A3o+Paulo" 
         style="display: inline-block; background-color: #a3ff3c; color: #161533; padding: 15px 40px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px;">
        Adicionar ao Calendário
      </a>
    </div>
    
    <p style="font-size: 14px; color: #666; margin-top: 30px;">
      Qualquer dúvida, entre em contato conosco pelo e-mail 
      <a href="mailto:hub@hubacademybr.com" style="color: #161533;">hub@hubacademybr.com</a>
    </p>
    
    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
    
    <p style="font-size: 12px; color: #999; text-align: center;">
      © ${new Date().getFullYear()} Hub Academy. Todos os direitos reservados.
    </p>
  </div>
</body>
</html>
      `.trim()
    },

    d1: {
      subject: '🎉 Amanhã é dia de English Night Live!',
      html: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Amanhã é o dia - English Night Live</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #161533; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #a3ff3c; margin: 0; font-size: 28px;">🎉 Amanhã é o dia!</h1>
    <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 18px;">English Night Live</p>
  </div>
  
  <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #161533; margin-top: 0;">Olá, ${contact.firstname}!</h2>
    
    <p style="font-size: 16px;">
      Amanhã acontece o <strong>English Night Live</strong>! 🚀
    </p>
    
    <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 25px 0; border-radius: 5px;">
      <h3 style="color: #161533; margin-top: 0;">📍 Como chegar</h3>
      <p style="margin: 10px 0;"><strong>Endereço:</strong> Av. Paulista, 1374 - 12º andar<br>Brazilian Financial Center</p>
      <p style="margin: 10px 0;"><strong>Metrô:</strong> Estação Trianon-MASP (Linha Verde)</p>
      <p style="margin: 10px 0; font-size: 14px; color: #856404;">
        💡 Entre pela recepção e se dirija ao 12º andar.
      </p>
    </div>
    
    <div style="background-color: #ffffff; border-left: 4px solid #a3ff3c; padding: 20px; margin: 25px 0; border-radius: 5px;">
      <h3 style="color: #161533; margin-top: 0;">🕐 Horário</h3>
      <p style="margin: 10px 0; font-size: 18px;"><strong>18h30 às 22h</strong></p>
      <p style="margin: 10px 0; font-size: 14px; color: #666;">
        Sugerimos chegar um pouco antes para aproveitar desde o início!
      </p>
    </div>
    
    <h3 style="color: #161533;">🎒 Lembre-se de levar:</h3>
    <ul style="padding-left: 20px; margin: 10px 0;">
      <li>✅ Disposição para praticar inglês</li>
      <li>✅ Mente aberta para novas conexões</li>
    </ul>
    
    <p style="font-size: 16px; text-align: center; background-color: #e8ffe8; padding: 20px; border-radius: 5px; margin: 25px 0;">
      <strong>Será um prazer receber você!</strong> 💙
    </p>
    
    <p style="font-size: 14px; color: #666; margin-top: 30px;">
      Qualquer dúvida de última hora, entre em contato pelo e-mail 
      <a href="mailto:hub@hubacademybr.com" style="color: #161533;">hub@hubacademybr.com</a>
    </p>
    
    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
    
    <p style="font-size: 12px; color: #999; text-align: center;">
      © ${new Date().getFullYear()} Hub Academy. Todos os direitos reservados.
    </p>
  </div>
</body>
</html>
      `.trim()
    },

    followup: {
      subject: '💙 Obrigado por participar do English Night Live!',
      html: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Obrigado - English Night Live</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #161533; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #a3ff3c; margin: 0; font-size: 28px;">💙 Obrigado!</h1>
    <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 18px;">English Night Live</p>
  </div>
  
  <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #161533; margin-top: 0;">Olá, ${contact.firstname}!</h2>
    
    <p style="font-size: 16px;">
      Foi incrível ter você conosco no <strong>English Night Live</strong>! 🎉
    </p>
    
    <p style="font-size: 16px;">
      Esperamos que tenha aproveitado as conversas, feito novas conexões e praticado bastante inglês.
    </p>
    
    <div style="background-color: #ffffff; border-left: 4px solid #a3ff3c; padding: 20px; margin: 25px 0; border-radius: 5px;">
      <h3 style="color: #161533; margin-top: 0;">🗓️ Próximos MeetUPs</h3>
      <p style="margin: 10px 0;">
        Fique de olho! O próximo <strong>English Night Live</strong> será em <strong>novembro</strong>. 
        Em breve enviaremos mais detalhes.
      </p>
    </div>
    
    <h3 style="color: #161533;">📚 Continue praticando:</h3>
    <p style="font-size: 16px;">
      Que tal continuar sua jornada no inglês? Conheça nossos programas de imersão e desenvolvimento profissional.
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://hubacademybr.com/solucoes" 
         style="display: inline-block; background-color: #a3ff3c; color: #161533; padding: 15px 40px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px;">
        Conhecer Programas
      </a>
    </div>
    
    <p style="font-size: 14px; color: #666; margin-top: 30px;">
      Qualquer dúvida, entre em contato conosco pelo e-mail 
      <a href="mailto:hub@hubacademybr.com" style="color: #161533;">hub@hubacademybr.com</a>
    </p>
    
    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
    
    <p style="font-size: 16px; text-align: center; color: #161533;">
      <strong>See you soon! 🚀</strong>
    </p>
    
    <p style="font-size: 12px; color: #999; text-align: center;">
      © ${new Date().getFullYear()} Hub Academy. Todos os direitos reservados.
    </p>
  </div>
</body>
</html>
      `.trim()
    }
  }

  return templates[type]
}

