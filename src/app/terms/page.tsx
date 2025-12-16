export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 text-slate-700">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Términos y Condiciones</h1>
      <div className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">1. Introducción</h2>
          <p>
            Bienvenido a GOWS Hardware. Al acceder a nuestro sitio web, aceptas estar sujeto a estos términos de
            servicio, todas las leyes y regulaciones aplicables en la República Argentina.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">2. Garantía de Productos</h2>
          <p>
            Todos los componentes comercializados cuentan con la garantía oficial del fabricante. El período de garantía
            varía según la marca, siendo típicamente de 12 a 36 meses. Para tramitar RMA, es necesario presentar la
            factura de compra.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">3. Envíos y Entregas</h2>
          <p>
            Los tiempos de envío son estimativos. GOWS Hardware no se responsabiliza por demoras ocasionadas por las
            empresas de logística (Correo Argentino, Andreani) una vez despachado el producto.
          </p>
        </section>
      </div>
    </div>
  );
}
