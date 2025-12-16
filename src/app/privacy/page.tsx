export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 text-slate-700">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Política de Privacidad</h1>
      <div className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <p>En GOWS Hardware nos tomamos muy en serio la seguridad de tus datos.</p>
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Uso de Datos</h2>
          <p>
            La información recopilada (Nombre, Dirección, Teléfono) se utiliza únicamente para procesar tu pedido y
            gestionar el envío. No compartimos tu información con terceros con fines publicitarios.
          </p>
        </section>
      </div>
    </div>
  );
}
