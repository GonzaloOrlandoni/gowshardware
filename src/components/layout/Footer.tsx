import Link from "next/link";
import {
  Monitor,
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Mail,
  Phone,
  CreditCard,
  Banknote,
  QrCode,
  FileText,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        {/* SECCIÓN SUPERIOR: DATOS Y LINKS */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* 1. Marca y Slogan */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6 text-white font-bold text-xl group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white transition-transform group-hover:scale-110">
                <Monitor size={20} />
              </div>
              GOWS Hardware
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              Líderes en hardware de alto rendimiento. Armamos tu PC gamer o workstation con garantía oficial y soporte
              experto.
            </p>
            {/* Redes Sociales */}
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* 2. Ayuda al Cliente */}
          <div>
            <h3 className="text-white font-bold mb-6 border-b border-slate-700 pb-2 inline-block">Ayuda</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/faq" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="text-blue-500">›</span> Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="text-blue-500">›</span> Mi Carrito
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="text-blue-500">›</span> Mi Cuenta
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="text-blue-500">›</span> Botón de Arrepentimiento
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Contacto */}
          <div>
            <h3 className="text-white font-bold mb-6 border-b border-slate-700 pb-2 inline-block">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 mt-1 shrink-0" />
                <span>
                  Av. Corrientes 1234, CABA
                  <br />
                  Buenos Aires, Argentina
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+54 9 11 1234-5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span>ventas@gowshardware.com</span>
              </li>
            </ul>
          </div>

          {/* 4. Medios de Pago (Nuevo!) */}
          <div>
            <h3 className="text-white font-bold mb-6 border-b border-slate-700 pb-2 inline-block">Medios de Pago</h3>
            <div className="grid grid-cols-3 gap-3">
              {/* Tarjetas */}
              <div className="flex h-10 items-center justify-center rounded bg-white p-1" title="Visa">
                <span className="text-xs font-bold text-blue-900">VISA</span>
              </div>
              <div className="flex h-10 items-center justify-center rounded bg-white p-1" title="Mastercard">
                <div className="flex -space-x-1">
                  <div className="h-4 w-4 rounded-full bg-red-500 opacity-80"></div>
                  <div className="h-4 w-4 rounded-full bg-yellow-500 opacity-80"></div>
                </div>
              </div>
              <div className="flex h-10 items-center justify-center rounded bg-white p-1" title="American Express">
                <span className="text-[10px] font-bold text-blue-400">AMEX</span>
              </div>
              {/* Mercado Pago / Digital */}
              <div
                className="flex h-10 items-center justify-center rounded bg-white p-1 text-blue-500"
                title="Mercado Pago"
              >
                <QrCode size={20} />
              </div>
              <div
                className="flex h-10 items-center justify-center rounded bg-white p-1 text-green-600"
                title="Transferencia Bancaria"
              >
                <Banknote size={20} />
              </div>
              <div
                className="flex h-10 items-center justify-center rounded bg-white p-1 text-slate-900"
                title="Ahora 12 / Cuota Simple"
              >
                <CreditCard size={20} />
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Pagá en cuotas o aprovechá un 10% OFF pagando con transferencia.
            </p>
          </div>
        </div>

        {/* SECCIÓN INFERIOR: LEGALES */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2024 GOWS Hardware. Todos los derechos reservados.</p>

          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Política de Privacidad
            </Link>
            {/* Simulación Data Fiscal */}
            <div className="flex items-center gap-1 opacity-70 hover:opacity-100 cursor-pointer">
              <FileText size={14} />
              <span>Data Fiscal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
