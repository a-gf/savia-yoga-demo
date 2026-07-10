# Savia Yoga & Bienestar

Demo de un sitio de clases de yoga con **Alma**, un asistente conectado a un workflow de n8n mediante webhook.

## Desarrollo local

1. Instala las dependencias con `npm install`.
2. Copia `.env.example` como `.env.local`.
3. Configura `N8N_WEBHOOK_URL` con el webhook de producción de n8n.
4. Ejecuta `npm run dev`.

## Despliegue en Vercel

Importa este repositorio desde Vercel y agrega `N8N_WEBHOOK_URL` en **Settings → Environment Variables** para Production, Preview y Development. Luego realiza un nuevo deployment.

La URL del webhook se utiliza exclusivamente en la ruta del servidor `/api/chat`; no se entrega al navegador.
