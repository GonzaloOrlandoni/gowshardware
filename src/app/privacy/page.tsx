export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 text-slate-300">
      <h1 className="mb-8 text-3xl font-bold text-white">
        Política de Privacidad
      </h1>
      <div className="space-y-6 bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white/10">
        <p>
          En GOWS Hardware nos tomamos muy en serio la seguridad de tus datos.
        </p>
        <section>
          <h2 className="text-lg font-bold text-white mb-2">Uso de Datos</h2>
          <p>
            La información recopilada (Nombre, Dirección, Teléfono) se utiliza
            únicamente para procesar tu pedido y gestionar el envío. No
            compartimos tu información con terceros con fines publicitarios.
          </p>
        </section>
      </div>
    </div>
  );
}
