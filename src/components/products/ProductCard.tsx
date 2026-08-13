"use client"; // <--- Convertimos a Client Component

import Image from "next/image";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart";
import { useState } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita que el Link principal se active al hacer click en el botón
    e.stopPropagation();

    addItem(product);
    setIsAdded(true);
    toast.success(`${product.name} agregado al carrito`);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-sm transition-all hover:shadow-[0_0_30px_rgba(204,255,0,0.15)] hover:border-white/20">
      <Link
        href={`/products/${product.id}`}
        className="relative aspect-square w-full overflow-hidden bg-black/50 block"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        {product.stock < 10 && (
          <span className="absolute left-2 top-2 rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-700">
            ¡Últimas {product.stock}!
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-xs font-medium text-slate-400 uppercase">
          {product.category}
        </p>

        <Link href={`/products/${product.id}`}>
          <h3 className="mb-2 text-sm font-bold text-white line-clamp-2 leading-tight hover:text-neon-green transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Precio contado</span>
            <span className="text-lg font-bold text-neon-green drop-shadow-[0_0_5px_rgba(204,255,0,0.5)]">
              ${product.price}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium  transition-all
              ${isAdded ? "bg-neon-green text-black" : "bg-white/10 hover:bg-neon-green hover:text-black"}`}
          >
            {isAdded ? <Check size={16} /> : <Plus size={16} />}
            {isAdded ? "Listo" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}
