import { NextRequest, NextResponse } from "next/server";

const facts = [
  [/[Pp]recio|cu[aá]nto|cuesta|plan/, "La clase suelta cuesta $35.000 COP. El plan Raíz incluye 4 clases por $120.000 al mes y Florece incluye 8 clases por $195.000 al mes."],
  [/[Hh]orario|qu[eé] d[ií]a|hora/, "Tenemos clases de lunes a sábado. Entre semana hay opciones en la mañana (7:00 u 8:00) y en la tarde (17:30, 18:30 o 19:00). Los sábados tenemos clases a las 9:00 y 10:30."],
  [/[Pp]rincipiante|experiencia|empezar/, "¡Claro! No necesitas experiencia. Hatha suave y Yin restaurativo son muy buenas opciones para comenzar, con variaciones para cada cuerpo."],
  [/[Mm]at|tapete|llevar/, "Puedes traer tu propio mat, pero en Savia contamos con mats y elementos de apoyo sin costo adicional."],
  [/[Cc]ancel|reprogram/, "Puedes reprogramar sin costo hasta 6 horas antes. Después de ese plazo, la clase se considera utilizada."],
  [/[Dd][oó]nde|ubicaci[oó]n|direcci[oó]n/, "Estamos en Calle 12 #34–56, barrio Granada, Cali. Recuerda que Savia es un negocio ficticio creado para esta demostración."],
  [/[Cc]upo|personas|grupo/, "Trabajamos con grupos pequeños de máximo 8 personas por clase."],
  [/[Ee]stilo|clase|yoga/, "Ofrecemos Hatha suave, Vinyasa flow y Yin restaurativo. Las clases duran entre 60 y 75 minutos."],
];

export async function POST(request: NextRequest) {
  const body = await request.json();
  const webhook = process.env.N8N_WEBHOOK_URL;
  if (webhook) {
    try {
      const response = await fetch(webhook, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ question:body.question, sessionId:body.sessionId }) });
      if (response.ok) return NextResponse.json(await response.json());
    } catch { /* The demo knowledge base remains available if n8n is offline. */ }
  }
  const match = facts.find(([pattern]) => (pattern as RegExp).test(String(body.question ?? "")));
  return NextResponse.json({ answer: match?.[1] ?? "No tengo esa información en este momento, pero puedo conectarte con nuestro equipo para ayudarte mejor.", source:"demo" });
}
