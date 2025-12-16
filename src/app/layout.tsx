import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Importamos todos los componentes globales
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer"; // <--- Nuevo Footer
import ScrollToTop from "@/components/ui/ScrollToTop"; // <--- Botón de subir

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GOWS Hardware",
  description: "Tienda de hardware premium y armado de PC",
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
      </body>
    </html>
  );
}
