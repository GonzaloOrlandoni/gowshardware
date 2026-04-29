import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Importamos todos los componentes globales
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer"; // <--- Nuevo Footer
import ScrollToTop from "@/components/ui/ScrollToTop"; // <--- Botón de subir
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GOWS Hardware | Componentes PC, Armado Gamer y Hardware Premium",
  description:
    "Tienda de hardware premium para gaming y workstation. CPU, GPU, RAM, SSD y armado de PC profesional. Envíos a todo el país. Garantía oficial.",
  keywords: ["hardware", "PC gamer", "componentes PC", "GPU", "CPU", "armado de PC", "GOWS Hardware", "Argentina"],
  authors: [{ name: "GO Web Solutions" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "GOWS Hardware | Tu Tienda de Hardware Premium",
    description:
      "Componentes PC, armado profesional y hardware gaming. Garantía oficial y envíos seguros a todo Argentina.",
    siteName: "GOWS Hardware",
  },
  twitter: {
    card: "summary_large_image",
    title: "GOWS Hardware | Componentes PC Premium",
    description: "CPU, GPU, RAM, SSD y armado de PC profesional. ¡Potenciá tu setup!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* 1. Barra de Navegación (Sticky Top) */}
        <Navbar />

        {/* 2. Contenido Principal
            Usamos min-h-screen para asegurar que ocupe al menos toda la pantalla
            y bg-slate-50 para un fondo gris muy suave y moderno.
        */}
        <main className="min-h-screen bg-slate-50">{children}</main>

        {/* 3. Pie de Página (Footer) */}
        <Footer />

        {/* 4. Botón Flotante (Scroll to Top) */}
        <ScrollToTop />

        {/* 5. Toaster Global */}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
