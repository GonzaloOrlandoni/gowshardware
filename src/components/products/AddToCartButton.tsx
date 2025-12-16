"use client"; // Esto permite interactividad

import { ShoppingCart, Check } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { Product } from "@/types/product";
import { useState } from "react";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  // Conectamos con la función addItem del store
  const addItem = useCartStore((state) => state.addItem);

  // Estado local para una pequeña animación de "¡Éxito!"
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product); // 1. Agrega al carrito global

    // 2. Feedback visual (cambia el botón por 2 segundos)
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdded}
      className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-8 py-4 font-bold text-white transition-all
        ${
          isAdded
            ? "bg-green-600 hover:bg-green-700"
            : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25"
        }`}
    >
      {isAdded ? (
        <>
          <Check size={20} />
          ¡Agregado!
        </>
      ) : (
        <>
          <ShoppingCart size={20} />
          Agregar al Carrito
        </>
      )}
    </button>
  );
}
