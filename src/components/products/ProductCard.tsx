"use client"; // <--- Convertimos a Client Component

import Image from "next/image";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart";
import { useState } from "react";

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
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg">
      <Link
        href={`/products/${product.id}`}
        className="relative aspect-square w-full overflow-hidden bg-slate-100 block"
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
        <p className="mb-1 text-xs font-medium text-slate-500 uppercase">{product.category}</p>

        <Link href={`/products/${product.id}`}>
          <h3 className="mb-2 text-sm font-bold text-slate-900 line-clamp-2 leading-tight hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Precio contado</span>
            <span className="text-lg font-bold text-blue-600">${product.price}</span>
          </div>

          <button
            onClick={handleQuickAdd}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-white transition-all
              ${isAdded ? "bg-green-600" : "bg-slate-900 hover:bg-blue-600"}`}
          >
            {isAdded ? <Check size={16} /> : <Plus size={16} />}
            {isAdded ? "Listo" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}
