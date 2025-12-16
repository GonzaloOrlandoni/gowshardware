import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Truck, ShieldCheck } from "lucide-react"; // Se quitó ShoppingCart
import { products } from "@/data/products";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/products/AddToCartButton";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Botón Volver */}
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600">
        <ArrowLeft size={16} />
        Volver al catálogo
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Columna Izquierda: Imagen */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2">
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            className="h-full w-full object-contain"
            priority
          />
        </div>

        {/* Columna Derecha: Información */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
              {product.category}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{product.name}</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-blue-600">${product.price}</span>
            <div className="flex items-center gap-1 text-sm text-green-600 bg-green-50 px-2 py-1 rounded-md">
              <Check size={16} />
              <span className="font-medium">Stock disponible</span>
            </div>
          </div>

          {/* Especificaciones */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-3 font-semibold text-slate-900">Especificaciones Técnicas:</h3>
            <ul className="grid gap-2 text-sm">
              {product.specs ? (
                Object.entries(product.specs).map(([key, value]) => (
                  <li key={key} className="flex justify-between border-b border-slate-200 pb-2 last:border-0">
                    <span className="text-slate-500">{key}:</span>
                    <span className="font-medium text-slate-900">{value}</span>
                  </li>
                ))
              ) : (
                <li className="text-slate-500">Detalles generales en descripción.</li>
              )}
            </ul>
          </div>

          {/* Acciones: AQUÍ ESTÁ EL CAMBIO IMPORTANTE */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <AddToCartButton product={product} />
          </div>

          {/* Garantías */}
          <div className="grid grid-cols-2 gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-slate-400" />
              <span>Envío gratis a todo el país</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-slate-400" />
              <span>Garantía oficial 12 meses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
