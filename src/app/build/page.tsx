"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { products } from "@/data/products";
import { Product } from "@/types/product";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Cpu,
  CircuitBoard,
  Fan,
  MemoryStick,
  HardDrive,
  Monitor,
  Mouse,
  Cable,
  Server,
  Plus,
  X,
  ShoppingCart,
  Check,
  AlertCircle,
  Wrench,
  CheckCircle,
  FileDown,
} from "lucide-react";

const STEPS = [
  { id: "CPU", label: "Procesador", icon: Cpu, category: "CPU", required: true },
  { id: "Motherboard", label: "Motherboard", icon: CircuitBoard, category: "Motherboard", required: true },
  { id: "Cooler", label: "Refrigeración", icon: Fan, category: "Cooler" },
  { id: "RAM", label: "Memoria RAM", icon: MemoryStick, category: "RAM", multi: true, max: 4, required: true },
  { id: "GPU", label: "Placa de Video", icon: Monitor, category: "GPU" },
  {
    id: "Almacenamiento",
    label: "Almacenamiento",
    icon: HardDrive,
    category: "Almacenamiento",
    multi: true,
    max: 3,
    hasFilters: true,
  },
  { id: "Fuente", label: "Fuente de Alimentación", icon: Cable, category: "Fuente", required: true },
  { id: "Gabinete", label: "Gabinete", icon: Server, category: "Gabinete", required: true },
  { id: "Monitor", label: "Monitor", icon: Monitor, category: "Monitor" },
  { id: "Perifericos", label: "Periféricos", icon: Mouse, category: "Perifericos", multi: true, max: 5 },
];

type StorageFilterType = "todos" | "ssd" | "hdd";

export default function BuildPage() {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const [selection, setSelection] = useState<Record<string, Product[]>>({});
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  const [includeAssembly, setIncludeAssembly] = useState(true);
  const [storageFilter, setStorageFilter] = useState<StorageFilterType>("todos");

  const assemblyService = products.find((p) => p.id === "serv-armado");
  const flatSelection = Object.values(selection).flat();
  const hardwareTotal = flatSelection.reduce((acc, p) => acc + p.price, 0);
  const assemblyPrice = includeAssembly && assemblyService ? assemblyService.price : 0;
  const totalPrice = hardwareTotal + assemblyPrice;
  const isReadyToBuy = STEPS.filter((s) => s.required).every((s) => selection[s.id]?.length > 0);

  // --- FUNCIÓN GENERAR PDF ---
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Presupuesto - GOWS Hardware", 14, 22);
    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text("Web: www.gowshardware.com", 14, 35);

    const tableData = flatSelection.map((p) => [p.category, p.name, `$${p.price.toLocaleString()}`]);

    if (includeAssembly && assemblyService) {
      tableData.push(["Servicio", "Armado Profesional e Instalación", `$${assemblyService.price.toLocaleString()}`]);
    }

    autoTable(doc, {
      startY: 40,
      head: [["Categoría", "Producto", "Precio"]],
      body: tableData,
      foot: [["", "TOTAL FINAL", `$${totalPrice.toLocaleString()}`]],
      theme: "grid",
      headStyles: { fillColor: [37, 99, 235] },
      footStyles: { fillColor: [241, 245, 249], textColor: [0, 0, 0], fontStyle: "bold" },
    });

    doc.save("Presupuesto_GOWS.pdf");
  };

  const handleSelect = (product: Product, step: (typeof STEPS)[0]) => {
    setSelection((prev) => {
      const currentItems = prev[step.id] || [];
      if (step.multi) {
        if (currentItems.length < (step.max || 1)) return { ...prev, [step.id]: [...currentItems, product] };
        return prev;
      } else {
        return { ...prev, [step.id]: [product] };
      }
    });
    if (!step.multi) setActiveStepId(null);
  };

  const handleRemove = (stepId: string, indexToRemove: number) => {
    setSelection((prev) => {
      const currentItems = prev[stepId] || [];
      const newItems = currentItems.filter((_, index) => index !== indexToRemove);
      return { ...prev, [stepId]: newItems };
    });
  };

  const handleFinish = () => {
    flatSelection.forEach((p) => addItem(p));
    if (includeAssembly && assemblyService) addItem(assemblyService);
    router.push("/cart");
  };

  const activeStepConfig = STEPS.find((s) => s.id === activeStepId);
  const modalProducts = useMemo(() => {
    if (!activeStepConfig) return [];
    let filtered = products.filter((p) => p.category === activeStepConfig.category);
    if (activeStepConfig.id === "Almacenamiento" && storageFilter !== "todos") {
      filtered = filtered.filter((p) => {
        const isSSD = p.name.toLowerCase().includes("ssd") || p.specs?.Tipo?.toLowerCase().includes("ssd");
        return storageFilter === "ssd" ? isSSD : !isSSD;
      });
    }
    return filtered;
  }, [activeStepConfig, storageFilter]);

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Configurador de PC</h1>
        <p className="mt-2 text-slate-600">Selecciona tus componentes. Nosotros la armamos.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* COLUMNA IZQUIERDA (Pasos) */}
        <div className="lg:col-span-8 space-y-4">
          {STEPS.map((step) => {
            const selectedItems = selection[step.id] || [];
            const hasSelection = selectedItems.length > 0;
            const isMaxReached = step.multi && selectedItems.length >= (step.max || 1);

            // CORRECCIÓN: Usamos 'const' en lugar de 'let'
            const containerClass = hasSelection
              ? "border-orange-200 bg-orange-50/30"
              : step.required
              ? "border-slate-200 bg-white"
              : "border-slate-200 bg-white";
            const iconBgClass = hasSelection
              ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-md"
              : step.required
              ? "bg-slate-100 text-slate-500 border border-slate-200"
              : "bg-slate-100 text-slate-400";

            return (
              <div key={step.id} className={`overflow-hidden rounded-xl border transition-all ${containerClass}`}>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl ${iconBgClass} transition-colors`}
                    >
                      <step.icon size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900">{step.label}</h3>
                        {step.required && !hasSelection && (
                          <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">
                            <AlertCircle size={10} /> Requerido
                          </span>
                        )}
                      </div>
                      <p className={`text-sm ${hasSelection ? "font-medium text-orange-700" : "text-slate-400"}`}>
                        {hasSelection
                          ? step.multi
                            ? `${selectedItems.length} seleccionado(s)`
                            : selectedItems[0].name
                          : "Sin seleccionar"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveStepId(step.id);
                      setStorageFilter("todos");
                    }}
                    disabled={isMaxReached}
                    className={`rounded-lg px-6 py-2.5 text-sm font-bold transition-colors ${
                      hasSelection
                        ? isMaxReached
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                    }`}
                  >
                    {hasSelection ? (step.multi && !isMaxReached ? "Agregar otro" : "Cambiar") : "Seleccionar"}
                  </button>
                </div>
                {hasSelection && (
                  <div className="border-t border-slate-200/50 bg-white px-4 py-3">
                    {selectedItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50 p-1">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={48}
                              height={48}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div>
                            <p className="line-clamp-1 text-sm font-medium text-slate-900">{item.name}</p>
                            <p className="text-xs text-slate-500 font-bold">${item.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemove(step.id, idx)}
                          className="rounded-full p-2 text-slate-400 hover:bg-red-100 hover:text-red-600 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* COLUMNA DERECHA (Resumen) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900">
              <ShoppingCart className="text-blue-600" /> Resumen
            </h2>

            {assemblyService && (
              <div
                onClick={() => setIncludeAssembly(!includeAssembly)}
                className={`mb-6 flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${
                  includeAssembly ? "border-green-500 bg-green-50" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-full p-2 ${
                      includeAssembly ? "bg-green-500 text-white" : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    <Wrench size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Servicio de Armado</p>
                    <p className="text-sm text-slate-600">{includeAssembly ? "Incluido" : "No incluir"}</p>
                  </div>
                </div>
                <div className="text-right">
                  {includeAssembly && <Check size={20} className="text-green-600 ml-auto mb-1" />}
                  <p className={`font-bold ${includeAssembly ? "text-green-700" : "text-slate-400"}`}>
                    ${assemblyService.price.toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3 border-b border-slate-100 pb-6 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Hardware ({flatSelection.length} items)</span>
                <span>${hardwareTotal.toLocaleString()}</span>
              </div>
            </div>
            <div className="my-6 flex items-end justify-between">
              <span className="text-lg font-bold text-slate-900">Total Final</span>
              <div className="text-right">
                <span className="block text-3xl font-extrabold text-blue-600">${totalPrice.toLocaleString()}</span>
                <span className="text-xs text-slate-500">IVA Incluido</span>
              </div>
            </div>

            <div className="grid gap-3">
              <button
                onClick={handleFinish}
                disabled={!isReadyToBuy || flatSelection.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-lg font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {isReadyToBuy ? (
                  <>
                    Finalizar <CheckCircle />
                  </>
                ) : (
                  <>Pasos incompletos</>
                )}
              </button>

              <button
                onClick={handleDownloadPDF}
                disabled={flatSelection.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3 font-bold text-slate-700 transition-all hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FileDown size={20} /> Descargar Presupuesto
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {activeStepId && activeStepConfig && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 p-5">
              <div className="flex items-center gap-3">
                <activeStepConfig.icon className="text-blue-600" size={24} />
                <h2 className="text-xl font-bold text-slate-900">Seleccionar {activeStepConfig.label}</h2>
              </div>
              <button
                onClick={() => setActiveStepId(null)}
                className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200"
              >
                <X size={20} />
              </button>
            </div>
            {activeStepConfig.hasFilters && (
              <div className="flex gap-2 border-b border-slate-100 p-4 bg-slate-50">
                <span className="text-sm font-bold text-slate-700 py-2">Tipo:</span>
                {(["todos", "ssd", "hdd"] as StorageFilterType[]).map((filtro) => (
                  <button
                    key={filtro}
                    onClick={() => setStorageFilter(filtro)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                      storageFilter === filtro
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    {filtro === "ssd" ? "Sólido (SSD)" : filtro === "hdd" ? "Rígido (HDD)" : filtro}
                  </button>
                ))}
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-5 bg-slate-50">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {modalProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelect(product, activeStepConfig)}
                    className="group cursor-pointer flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-blue-500 hover:shadow-md active:scale-[0.98]"
                  >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50 p-2">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <span className="text-lg font-bold text-blue-600">${product.price.toLocaleString()}</span>
                    </div>
                    <button className="mt-auto rounded-full bg-blue-50 p-2 text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                      <Plus size={20} />
                    </button>
                  </div>
                ))}
                {modalProducts.length === 0 && (
                  <div className="col-span-full py-16 text-center text-slate-500">No se encontraron componentes.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
