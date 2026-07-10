# Savia 🌿 Yoga y bienestar

<p align="center">
  <img src="public/savia-hero.webp" alt="Savia Yoga y Bienestar" width="100%" />
</p>

Savia es un centro ficticio de yoga y bienestar. Su página web incorpora a **Alma**, una asistente conectada a n8n que responde preguntas sobre clases, precios, horarios y políticas del negocio.

Alma conserva el contexto de la conversación, consulta una base de conocimiento propia y reconoce cuando no dispone de información suficiente, evitando inventar respuestas.

### [🌐 Probar la demo](https://savia-yoga-demo.vercel.app/)

## Lo que la hace diferente

Alma no funciona como un chatbot aislado: está integrada directamente en el sitio para orientar a los clientes mientras exploran las clases, horarios y planes de Savia.

## Funcionalidades

- Sitio responsive con información sobre clases, horarios, precios y preguntas frecuentes.
- Chat integrado con historial independiente por sesión.
- Respuestas basadas en una Data Table de n8n con información concreta del negocio.
- Memoria de conversación para responder preguntas de seguimiento.
- Respuesta honesta cuando la base de conocimiento no contiene la información solicitada.
- Modelo alternativo configurado en n8n si el modelo principal no está disponible.
- Base local de respaldo si el webhook no responde temporalmente.
- Interpretación de formato básico en las respuestas del asistente.

## Arquitectura

```text
Usuario
   ↓
Sitio web en Next.js
   ↓
API segura del servidor (/api/chat)
   ↓
Webhook de n8n
   ↓
Agente de IA ── Memoria de conversación
   ↓
Knowledge Base (n8n Data Table)
   ↓
Respuesta al chat
```

La página no llama directamente a n8n desde el navegador. La ruta `/api/chat` actúa como intermediaria, por lo que la URL del webhook se mantiene como una variable de entorno del servidor.

## Tecnologías

- **Frontend y backend:** Next.js, React, TypeScript y CSS.
- **Automatización:** n8n.
- **Conocimiento:** n8n Data Tables.
- **IA:** agente con memoria y modelo de respaldo.
- **Despliegue:** Vercel.
- **Control de versiones:** GitHub.

## Ejecución local

Requisitos: Node.js 20 o superior y un webhook activo de n8n.

```bash
git clone https://github.com/a-gf/savia-yoga-demo.git
cd savia-yoga-demo
npm install
```

Crea un archivo `.env.local` a partir de `.env.example` y configura la URL de producción de tu webhook:

```env
N8N_WEBHOOK_URL=https://tu-instancia-n8n.example/webhook/yoga-assistant
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Despliegue en Vercel

1. Importa este repositorio desde Vercel.
2. Agrega `N8N_WEBHOOK_URL` en **Environment Variables** para Production y Preview.
3. Realiza un nuevo deployment.

> [!NOTE]
> Savia es un negocio ficticio creado con fines demostrativos. Los precios, horarios, datos de contacto y políticas no corresponden a una empresa real.
