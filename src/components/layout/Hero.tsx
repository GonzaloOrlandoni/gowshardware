"use client";

import Image from "next/image";
import Link from "next/link";
import { Settings, ShieldCheck, Users, Truck } from "lucide-react";
export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-transparent pt-10 lg:pt-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Columna de Texto */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-neon-green animate-pulse shadow-[0_0_10px_#ccff00]"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-neon-green">
                Nueva serie RTX 4000 disponible
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Potencia tu Setup con{" "}
              <span className="text-neon-green drop-shadow-[0_0_15px_rgba(204,255,0,0.4)]">
                Hardware Premium
              </span>
            </h1>

            <p className="text-lg text-slate-300">
              En GOWS Hardware seleccionamos los mejores componentes para
              gamers. Armado profesional, garantía oficial y envíos asegurados.
            </p>

            {/* Botones */}
            <div className="mt-2 flex flex-wrap gap-4">
              <Link
                href="#catalogo"
                className="rounded-lg bg-neon-green px-6 py-3 font-bold text-black transition-all hover:bg-white hover:text-black hover:shadow-[0_0_20px_#ccff00]"
              >
                Ver Catálogo &rarr;
              </Link>

              <Link
                href="/build"
                className="flex items-center gap-2 rounded-lg border-2 border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 font-semibold text-white transition-all hover:border-neon-green hover:bg-neon-green/10 hover:text-neon-green"
              >
                <Settings size={20} />
                Armar PC
              </Link>
            </div>

            {/* Badges de Confianza - MEJORADO */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-1 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-3">
                <ShieldCheck className="text-neon-green" size={24} />
                <span className="text-xs font-bold text-white">
                  Garantía Oficial
                </span>
                <span className="text-[10px] text-slate-400">
                  En todos los productos
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-3">
                <Users className="text-neon-green" size={24} />
                <span className="text-xs font-bold text-white">
                  +1000 Clientes
                </span>
                <span className="text-[10px] text-slate-400">
                  Felices en todo el país
                </span>
              </div>
              <div className="hidden flex-col gap-1 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-3 sm:flex">
                <Truck className="text-neon-green" size={24} />
                <span className="text-xs font-bold text-white">
                  Envíos Seguros
                </span>
                <span className="text-[10px] text-slate-400">
                  A todo el territorio
                </span>
              </div>
            </div>
          </div>

          {/* Columna de Imagen */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="absolute -right-4 top-0 -z-10 h-72 w-72 rounded-full bg-neon-green/20 blur-[80px] lg:h-96 lg:w-96"></div>

            <Image
              src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80"
              alt="Gaming PC Setup"
              width={800}
              height={600}
              className="relative aspect-video w-full rounded-2xl object-cover shadow-[0_0_40px_rgba(204,255,0,0.1)] border border-white/10 lg:aspect-square"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
