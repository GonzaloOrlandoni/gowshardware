"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowLeft, MessageCircle, XCircle } from "lucide-react";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const { cart, removeItem, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  // Calcular total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Generar mensaje de WhatsApp
  const handleCheckout = () => {
    const phoneNumber = "5491128831895";
    const cartItems = cart
      .map((item) => `• ${item.quantity}x ${item.name} - $${item.price}`)
      .join("\n");
    const message = `Hola GOWS Hardware! 👋\nQuiero finalizar mi compra:\n\n${cartItems}\n\n*Total: $${total.toLocaleString()}*`;
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  if (!isMounted) return null;

  // ESTADO: CARRITO VACÍO (Con Emoji)
  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center px-4 animate-zoom-in">
        <div className="text-8xl">😔</div>
        <div>
          <h2 className="text-3xl font-bold text-white">
            Tu carrito está vacío
          </h2>
          <p className="mt-2 text-slate-400 text-lg">
            Parece que aún no has agregado nada.
          </p>
        </div>
        <Link
          href="/"
          className="rounded-full bg-neon-green text-black font-bold border-none px-8 py-3 font-bold  transition-all hover:bg-white hover:text-black hover:shadow-[0_0_15px_#ccff00] hover:shadow-lg hover:-translate-y-1"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  // ESTADO: CARRITO CON PRODUCTOS
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
        <h1 className="text-3xl font-bold text-white">Tu Carrito</h1>

        {/* Botón Vaciar Carrito */}
        <button
          onClick={clearCart}
          className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
        >
          <XCircle size={18} />
          Vaciar Carrito
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* COLUMNA IZQUIERDA: LISTA DE PRODUCTOS */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 shadow-sm transition-all hover:shadow-md"
            >
              {/* Imagen del producto */}
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/20 p-2">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Info del producto */}
              <div className="flex-1">
                <h3 className="font-bold text-white line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-sm text-slate-400 mb-1">{item.category}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="bg-white/5 px-2 py-1 rounded">
                    Cant: {item.quantity}
                  </span>
                </div>
              </div>

              {/* Precio y Eliminar */}
              <div className="text-right flex flex-col items-end gap-2">
                <p className="text-lg font-bold text-white">
                  ${(item.price * item.quantity).toLocaleString()}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="group rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Eliminar producto"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <Link
            href="/#catalogo"
            className="inline-flex items-center gap-2 text-sm font-medium text-neon-green hover:underline mt-6"
          >
            <ArrowLeft size={16} /> Continuar comprando
          </Link>
        </div>

        {/* COLUMNA DERECHA: RESUMEN DE PAGO */}
        <div className="h-fit rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg lg:sticky lg:top-24">
          <h2 className="mb-6 text-xl font-bold text-white">
            Resumen del Pedido
          </h2>

          <div className="space-y-3 border-b border-white/10 pb-6 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Subtotal</span>
              <span className="font-medium text-white">
                ${total.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Envío</span>
              <span className="font-bold text-green-600">Gratis</span>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-end">
            <span className="text-lg font-bold text-white">Total</span>
            <div className="text-right">
              <span className="block text-3xl font-extrabold text-neon-green">
                ${total.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400">IVA Incluido</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-8 w-full flex items-center justify-center gap-2 rounded-xl bg-green-600 py-4 font-bold text-white transition-all hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/20 active:scale-[0.98]"
          >
            <MessageCircle size={22} /> Finalizar en WhatsApp
          </button>

          <p className="mt-4 text-center text-xs text-slate-400">
            Serás redirigido a WhatsApp para coordinar el pago y envío.
          </p>
        </div>
      </div>
    </div>
  );
}
