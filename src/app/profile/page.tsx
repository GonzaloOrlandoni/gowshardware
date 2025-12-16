"use client";

import { useState } from "react";
import Image from "next/image";
// CORRECCIÓN: Agregamos 'Plus' a los imports 👇
import { User, Package, MapPin, CreditCard, LogOut, Settings, Bell, Plus } from "lucide-react";

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
        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <User size={48} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Gonzalo Dev</h2>
            <p className="text-sm text-slate-500">Cliente VIP</p>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors
                  ${activeTab === item.id ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <item.icon size={20} /> {item.label}
              </button>
            ))}
            <div className="my-4 border-t border-slate-100"></div>
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
              <h1 className="mb-6 text-2xl font-bold text-slate-900">Historial de Pedidos</h1>
              <div className="space-y-4">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-4">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">Pedido #29381</p>
                      <p className="text-sm text-slate-900">10 Dic 2025</p>
                    </div>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                      Entregado
                    </span>
                  </div>
                  <div className="p-4 flex items-center gap-4">
                    <div className="h-16 w-16 rounded-lg bg-slate-100 p-2 relative">
                      <Image
                        src="https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80"
                        alt="GPU"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">NVIDIA RTX 4090</p>
                      <p className="text-sm text-slate-500">x1 Unidad</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA DIRECCIONES */}
          {activeTab === "direcciones" && (
            <div className="animate-in fade-in duration-300">
              <h1 className="mb-6 text-2xl font-bold text-slate-900">Mis Direcciones</h1>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-6 relative">
                  <span className="absolute top-4 right-4 text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    Principal
                  </span>
                  <div className="mb-4 text-blue-600">
                    <MapPin size={24} />
                  </div>
                  <p className="font-bold text-slate-900">Casa</p>
                  <p className="text-slate-600">Av. Corrientes 1234, Piso 2 B</p>
                  <p className="text-slate-500 text-sm">CABA, Buenos Aires (1043)</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 p-6 text-slate-400 hover:border-blue-400 hover:text-blue-500 cursor-pointer transition-colors">
                  <Plus size={32} className="mb-2" />
                  <span className="font-bold">Agregar Nueva Dirección</span>
                </div>
              </div>
            </div>
          )}

          {/* VISTA PAGOS */}
          {activeTab === "pagos" && (
            <div className="animate-in fade-in duration-300">
              <h1 className="mb-6 text-2xl font-bold text-slate-900">Billetera</h1>
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <p className="text-slate-500 mb-4">Tarjetas guardadas</p>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="bg-slate-100 p-2 rounded">
                    <CreditCard className="text-slate-700" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Visa terminada en 4242</p>
                    <p className="text-sm text-slate-500">Vence 12/28</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA CONFIG */}
          {activeTab === "config" && (
            <div className="animate-in fade-in duration-300">
              <h1 className="mb-6 text-2xl font-bold text-slate-900">Configuración</h1>
              <div className="space-y-4 max-w-lg">
                <div className="flex items-center justify-between p-4 border rounded-xl bg-white">
                  <div className="flex items-center gap-3">
                    <Bell className="text-slate-500" />
                    <div>
                      <p className="font-bold">Notificaciones</p>
                      <p className="text-sm text-slate-500">Recibir ofertas por mail</p>
                    </div>
                  </div>
                  <div className="h-6 w-11 bg-blue-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full"></div>
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
