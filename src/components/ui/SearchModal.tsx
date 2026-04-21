"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Search, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { Product } from "@/types/product";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
    } else {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(debouncedQuery.toLowerCase()) || p.category.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults(filtered.slice(0, 5));
    }
  }, [debouncedQuery]);

  // Evitar scroll de fondo y escuchar tecla ESC
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // CORRECCIÓN: z-50 es estándar en Tailwind, evitamos z-[60]
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/50 p-4 pt-20 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Input Header */}
        <div className="flex items-center gap-4 border-b border-slate-100 p-4">
          <Search className="text-slate-400" size={24} />
          <input
            type="text"
            placeholder="Buscar productos (ej: RTX 4090, Ryzen, Teclado...)"
            className="flex-1 text-lg font-medium text-slate-900 outline-none placeholder:text-slate-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button onClick={onClose} className="rounded-full bg-slate-100 p-1 text-slate-500 hover:bg-slate-200">
            <X size={20} />
          </button>
        </div>

        {/* Resultados */}
        <div className="max-h-[60vh] overflow-y-auto bg-slate-50 p-2">
          {query === "" && (
            <div className="py-10 text-center text-slate-400">
              <p>Escribe para buscar componentes...</p>
            </div>
          )}

          {query !== "" && results.length === 0 && (
            <div className="py-10 text-center text-slate-500">
              {/* CORRECCIÓN: &quot; para las comillas */}
              <p>No encontramos nada con &quot;{query}&quot; 😢</p>
            </div>
          )}

          {results.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              onClick={onClose}
              className="flex items-center gap-4 rounded-xl p-3 hover:bg-white hover:shadow-sm transition-all group"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white p-1">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{product.name}</h4>
                <p className="text-xs text-slate-500 capitalize">{product.category}</p>
              </div>
              <span className="font-bold text-slate-900">${product.price}</span>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
