import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Savia Yoga & Bienestar",
  description: "Clases de yoga y bienestar para habitar tu cuerpo, calmar tu mente y cultivar equilibrio.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
