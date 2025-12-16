"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, Search, Monitor, User } from "lucide-react";
import { useCartStore } from "@/store/cart";
import SearchModal from "@/components/ui/SearchModal"; // <--- Importamos el buscador

export default function Navbar() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [isSearchOpen, setIsSearchOpen] = useState(false); // <--- Estado para el buscador

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white transition-transform group-hover:scale-110">
              <Monitor size={20} />
            </div>
            <span>
              GOWS<span className="text-blue-600">Hardware</span>
            </span>
          </Link>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Inicio
            </Link>
            <Link href="/#catalogo" className="hover:text-blue-600 transition-colors">
              Catálogo
            </Link>
            <Link href="/build" className="hover:text-blue-600 transition-colors">
              Arma tu PC
            </Link>
          </div>

          {/* Iconos Acción */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* LUPA: Ahora abre el Modal */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>

            {/* USUARIO: Ahora lleva al perfil */}
            <Link
              href="/profile"
              className="hidden sm:flex p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Usuario"
            >
              <User size={20} />
            </Link>

            {/* CARRITO */}
            <Link
              href="/cart"
              className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors group"
              aria-label="Ver carrito"
            >
              <ShoppingCart size={20} className="group-hover:text-blue-600 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>

            <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Renderizamos el Modal fuera del nav */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
