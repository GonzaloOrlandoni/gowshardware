"use client";

import { useState } from "react";
import Image from "next/image";
// CORRECCIÓN: Agregamos 'Plus' a los imports 👇
import {
  User,
  Package,
  MapPin,
  CreditCard,
  LogOut,
  Settings,
  Bell,
  Plus,
} from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("pedidos");

  const menuItems = [
    { id: "pedidos", label: "Mis Pedidos", icon: Package },
    { id: "direcciones", label: "Direcciones", icon: MapPin },
    { id: "pagos", label: "Métodos de Pago", icon: CreditCard },
    { id: "config", label: "Configuración", icon: Settings },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-4">
        {/* SIDEBAR */}
        <div className="h-fit rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-sm">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-neon-green">
              <User size={48} />
            </div>
            <h2 className="text-xl font-bold text-white">Gonzalo Dev</h2>
            <p className="text-sm text-slate-400">Cliente VIP</p>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors
                  ${activeTab === item.id ? "bg-neon-green/10 text-neon-green" : "text-slate-400 hover:bg-black/20"}`}
              >
                <item.icon size={20} /> {item.label}
              </button>
            ))}
            <div className="my-4 border-t border-white/10"></div>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium text-red-600 hover:bg-red-50">
              <LogOut size={20} /> Cerrar Sesión
            </button>
          </nav>
        </div>

        {/* CONTENIDO DINÁMICO */}
        <div className="lg:col-span-3">
          {/* VISTA PEDIDOS */}
          {activeTab === "pedidos" && (
            <div className="animate-in fade-in duration-300">
              <h1 className="mb-6 text-2xl font-bold text-white">
                Historial de Pedidos
              </h1>
              <div className="space-y-4">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-sm">
                  <div className="flex items-center justify-between border-b border-white/10 bg-black/20 p-4">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">
                        Pedido #29381
                      </p>
                      <p className="text-sm text-white">10 Dic 2025</p>
                    </div>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                      Entregado
                    </span>
                  </div>
                  <div className="p-4 flex items-center gap-4">
                    <div className="h-16 w-16 rounded-lg bg-white/5 p-2 relative">
                      <Image
                        src="https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80"
                        alt="GPU"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-white">NVIDIA RTX 4090</p>
                      <p className="text-sm text-slate-400">x1 Unidad</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA DIRECCIONES */}
          {activeTab === "direcciones" && (
            <div className="animate-in fade-in duration-300">
              <h1 className="mb-6 text-2xl font-bold text-white">
                Mis Direcciones
              </h1>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-blue-200 bg-neon-green/10/50 p-6 relative">
                  <span className="absolute top-4 right-4 text-xs font-bold text-neon-green bg-blue-100 px-2 py-1 rounded">
                    Principal
                  </span>
                  <div className="mb-4 text-neon-green">
                    <MapPin size={24} />
                  </div>
                  <p className="font-bold text-white">Casa</p>
                  <p className="text-slate-400">
                    Av. Corrientes 1234, Piso 2 B
                  </p>
                  <p className="text-slate-400 text-sm">
                    CABA, Buenos Aires (1043)
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/10 p-6 text-slate-400 hover:border-blue-400 hover:text-neon-green cursor-pointer transition-colors">
                  <Plus size={32} className="mb-2" />
                  <span className="font-bold">Agregar Nueva Dirección</span>
                </div>
              </div>
            </div>
          )}

          {/* VISTA PAGOS */}
          {activeTab === "pagos" && (
            <div className="animate-in fade-in duration-300">
              <h1 className="mb-6 text-2xl font-bold text-white">Billetera</h1>
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                <p className="text-slate-400 mb-4">Tarjetas guardadas</p>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="bg-white/5 p-2 rounded">
                    <CreditCard className="text-slate-300" />
                  </div>
                  <div>
                    <p className="font-bold text-white">
                      Visa terminada en 4242
                    </p>
                    <p className="text-sm text-slate-400">Vence 12/28</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA CONFIG */}
          {activeTab === "config" && (
            <div className="animate-in fade-in duration-300">
              <h1 className="mb-6 text-2xl font-bold text-white">
                Configuración
              </h1>
              <div className="space-y-4 max-w-lg">
                <div className="flex items-center justify-between p-4 border rounded-xl bg-white/5 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <Bell className="text-slate-400" />
                    <div>
                      <p className="font-bold">Notificaciones</p>
                      <p className="text-sm text-slate-400">
                        Recibir ofertas por mail
                      </p>
                    </div>
                  </div>
                  <div className="h-6 w-11 bg-neon-green text-black font-bold border-none rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 h-4 w-4 bg-white/5 backdrop-blur-md rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
