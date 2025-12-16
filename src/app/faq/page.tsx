'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    question: "¿Hacen envíos a todo el país?",
    answer: "Sí, realizamos envíos a toda Argentina a través de Correo Argentino y Andreani. El costo se calcula en base a tu código postal. Para CABA y GBA ofrecemos envíos en el día (moto mensajería) si compras antes de las 13hs."
  },
  {
    question: "¿Qué medios de pago aceptan?",
    answer: "Aceptamos todas las tarjetas de crédito y débito (Visa, Mastercard, Amex), Mercado Pago, y transferencia bancaria con un 10% de descuento adicional. También aceptamos efectivo en nuestro punto de retiro."
  },
  {
    question: "¿Los productos tienen garantía?",
    answer: "Sí, todos nuestros productos cuentan con Garantía Oficial del fabricante (desde 12 hasta 36 meses dependiendo el componente). Además, tenés 72hs de prueba directa con nosotros por cualquier falla de fábrica."
  },
  {
    question: "¿Realizan Factura A?",
    answer: "Sí, hacemos Factura A y B. Solo asegúrate de cargar tu CUIT correctamente en los datos de facturación al momento de finalizar la compra o enviárnoslo por WhatsApp junto con tu número de pedido."
  },
  {
    question: "¿Puedo retirar mi compra personalmente?",
    answer: "¡Claro! Podés retirar tu pedido por nuestro punto de entrega en Buenos Aires (Zona Palermo) de Lunes a Viernes de 10 a 18hs, una vez que te llegue el mail de confirmación de 'Listo para retirar'."
  },
  {
    question: "¿El armado de PC tiene costo?",
    answer: "El servicio de armado profesional tiene un costo bonificado si compras todos los componentes con nosotros. Incluye ensamble, gestión de cables y testeo de estrés de componentes."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <HelpCircle size={32} />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Preguntas Frecuentes</h1>
        <p className="mt-2 text-slate-600">Resolvemos tus dudas sobre compras, envíos y garantías.</p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx}
              className={`overflow-hidden rounded-xl border transition-all ${isOpen ? 'border-blue-200 bg-blue-50/30 shadow-sm' : 'border-slate-200 bg-white'}`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className={`font-bold ${isOpen ? 'text-blue-700' : 'text-slate-700'}`}>
                  {faq.question}
                </span>
                {isOpen ? <ChevronUp className="text-blue-600" /> : <ChevronDown className="text-slate-400" />}
              </button>

              {isOpen && (
                <div className="border-t border-blue-100 px-5 pb-5 pt-2 text-slate-600">
                  <p className="leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
