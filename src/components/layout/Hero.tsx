"use client";

import Image from "next/image";
import Link from "next/link";
import { Settings, ShieldCheck, Users, Truck } from "lucide-react";
export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-10 lg:pt-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Columna de Texto */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Nueva serie RTX 4000 disponible
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Potencia tu Setup con <span className="text-blue-600">Hardware Premium</span>
            </h1>

            <p className="text-lg text-slate-600">
              En GOWS Hardware seleccionamos los mejores componentes para gamers. Armado profesional, garantía oficial y
              envíos asegurados.
            </p>

            {/* Botones */}
            <div className="mt-2 flex flex-wrap gap-4">
              <Link
                href="#catalogo"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Ver Catálogo &rarr;
              </Link>

              <Link
                href="/build"
                className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <Settings size={20} />
                Armar PC
              </Link>
            </div>

            {/* Badges de Confianza - MEJORADO */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-1 rounded-lg border border-slate-100 bg-slate-50 p-3">
                <ShieldCheck className="text-green-600" size={24} />
                <span className="text-xs font-bold text-slate-900">Garantía Oficial</span>
                <span className="text-[10px] text-slate-500">En todos los productos</span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg border border-slate-100 bg-slate-50 p-3">
                <Users className="text-blue-600" size={24} />
                <span className="text-xs font-bold text-slate-900">+1000 Clientes</span>
                <span className="text-[10px] text-slate-500">Felices en todo el país</span>
              </div>
              <div className="hidden flex-col gap-1 rounded-lg border border-slate-100 bg-slate-50 p-3 sm:flex">
                <Truck className="text-orange-600" size={24} />
                <span className="text-xs font-bold text-slate-900">Envíos Seguros</span>
                <span className="text-[10px] text-slate-500">A todo el territorio</span>
              </div>
            </div>
          </div>

          {/* Columna de Imagen */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="absolute -right-4 top-0 -z-10 h-72 w-72 rounded-full bg-blue-50 blur-3xl lg:h-96 lg:w-96"></div>

            <Image
              src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
              alt="Gaming PC Setup"
              width={800}
              height={600}
              className="relative aspect-video w-full rounded-2xl object-cover shadow-2xl shadow-blue-900/10 lg:aspect-square"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
