"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowLeft, MessageCircle, XCircle } from "lucide-react";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const { cart, removeItem, clearCart } = useCartStore();

  // Calcular total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Generar mensaje de WhatsApp
  const handleCheckout = () => {
    const phoneNumber = "5491112345678"; // Reemplaza con tu número real
    const cartItems = cart.map((item) => `• ${item.quantity}x ${item.name} - $${item.price}`).join("\n");
    const message = `Hola GOWS Hardware! 👋\nQuiero finalizar mi compra:\n\n${cartItems}\n\n*Total: $${total.toLocaleString()}*`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // ESTADO: CARRITO VACÍO (Con Emoji)
  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center px-4 animate-in fade-in zoom-in duration-300">
        <div className="text-8xl">😔</div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Tu carrito está vacío</h2>
          <p className="mt-2 text-slate-500 text-lg">Parece que aún no has agregado nada.</p>
        </div>
        <Link
          href="/"
          className="rounded-full bg-blue-600 px-8 py-3 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  // ESTADO: CARRITO CON PRODUCTOS
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">Tu Carrito</h1>

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
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              {/* Imagen del producto */}
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50 p-2">
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
                <h3 className="font-bold text-slate-900 line-clamp-1">{item.name}</h3>
                <p className="text-sm text-slate-500 mb-1">{item.category}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="bg-slate-100 px-2 py-1 rounded">Cant: {item.quantity}</span>
                </div>
              </div>

              {/* Precio y Eliminar */}
              <div className="text-right flex flex-col items-end gap-2">
                <p className="text-lg font-bold text-slate-900">${(item.price * item.quantity).toLocaleString()}</p>
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
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline mt-6"
          >
            <ArrowLeft size={16} /> Continuar comprando
          </Link>
        </div>

        {/* COLUMNA DERECHA: RESUMEN DE PAGO */}
        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-lg lg:sticky lg:top-24">
          <h2 className="mb-6 text-xl font-bold text-slate-900">Resumen del Pedido</h2>

          <div className="space-y-3 border-b border-slate-100 pb-6 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-medium text-slate-900">${total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Envío</span>
              <span className="font-bold text-green-600">Gratis</span>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-end">
            <span className="text-lg font-bold text-slate-900">Total</span>
            <div className="text-right">
              <span className="block text-3xl font-extrabold text-blue-600">${total.toLocaleString()}</span>
              <span className="text-xs text-slate-500">IVA Incluido</span>
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
