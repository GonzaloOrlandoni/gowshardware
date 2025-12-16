import Hero from "@/components/layout/Hero";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";
import Link from "next/link"; // <--- Importante para que funcione el enlace

export default function Home() {
  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* Componente Hero (Banner Principal) */}
      <Hero />

      {/* Sección de Productos Destacados */}
      {/* El id="catalogo" permite que el scroll baje hasta aquí */}
      <section id="catalogo" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Tendencias en Hardware</h2>
            <p className="mt-2 text-slate-600">Los componentes más buscados de la semana.</p>
          </div>

          {/* CORRECCIÓN AQUÍ: Apunta al ancla #catalogo */}
          <Link href="#catalogo" className="hidden text-sm font-semibold text-blue-600 hover:text-blue-700 sm:block">
            Ver todo el catálogo &rarr;
          </Link>
        </div>

        {/* Grilla de Productos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
