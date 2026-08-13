"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { products } from "@/data/products";
import { Product } from "@/types/product";
import BuildStepList from "@/components/build/BuildStepList";
import BuildSummary from "@/components/build/BuildSummary";
import BuildStepModal from "@/components/build/BuildStepModal";
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
} from "lucide-react";

const STEPS = [
  {
    id: "CPU",
    label: "Procesador",
    icon: Cpu,
    category: "CPU",
    required: true,
  },
  {
    id: "Motherboard",
    label: "Motherboard",
    icon: CircuitBoard,
    category: "Motherboard",
    required: true,
  },
  { id: "Cooler", label: "Refrigeración", icon: Fan, category: "Cooler" },
  {
    id: "RAM",
    label: "Memoria RAM",
    icon: MemoryStick,
    category: "RAM",
    multi: true,
    max: 4,
    required: true,
  },
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
  {
    id: "Fuente",
    label: "Fuente de Alimentación",
    icon: Cable,
    category: "Fuente",
    required: true,
  },
  {
    id: "Gabinete",
    label: "Gabinete",
    icon: Server,
    category: "Gabinete",
    required: true,
  },
  { id: "Monitor", label: "Monitor", icon: Monitor, category: "Monitor" },
  {
    id: "Perifericos",
    label: "Periféricos",
    icon: Mouse,
    category: "Perifericos",
    multi: true,
    max: 5,
  },
];

type StorageFilterType = "todos" | "ssd" | "hdd";

export default function BuildPage() {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const [selection, setSelection] = useState<Record<string, Product[]>>({});
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  const [includeAssembly, setIncludeAssembly] = useState(true);
  const [storageFilter, setStorageFilter] =
    useState<StorageFilterType>("todos");

  const assemblyService = products.find((p) => p.id === "serv-armado");
  const flatSelection = Object.values(selection).flat();
  const hardwareTotal = flatSelection.reduce((acc, p) => acc + p.price, 0);
  const assemblyPrice =
    includeAssembly && assemblyService ? assemblyService.price : 0;
  const totalPrice = hardwareTotal + assemblyPrice;
  const isReadyToBuy = STEPS.filter((s) => s.required).every(
    (s) => selection[s.id]?.length > 0,
  );

  // --- FUNCIÓN GENERAR PDF ---
  const handleDownloadPDF = async () => {
    const jsPDF = (await import("jspdf")).default;
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Presupuesto - GOWS Hardware", 14, 22);
    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text("Web: www.gowshardware.com", 14, 35);

    const tableData = flatSelection.map((p) => [
      p.category,
      p.name,
      `$${p.price.toLocaleString()}`,
    ]);

    if (includeAssembly && assemblyService) {
      tableData.push([
        "Servicio",
        "Armado Profesional e Instalación",
        `$${assemblyService.price.toLocaleString()}`,
      ]);
    }

    autoTable(doc, {
      startY: 40,
      head: [["Categoría", "Producto", "Precio"]],
      body: tableData,
      foot: [["", "TOTAL FINAL", `$${totalPrice.toLocaleString()}`]],
      theme: "grid",
      headStyles: { fillColor: [37, 99, 235] },
      footStyles: {
        fillColor: [241, 245, 249],
        textColor: [0, 0, 0],
        fontStyle: "bold",
      },
    });

    doc.save("Presupuesto_GOWS.pdf");
  };

  const handleSelect = (product: Product, step: (typeof STEPS)[0]) => {
    setSelection((prev) => {
      const currentItems = prev[step.id] || [];
      if (step.multi) {
        if (currentItems.length < (step.max || 1))
          return { ...prev, [step.id]: [...currentItems, product] };
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
      const newItems = currentItems.filter(
        (_, index) => index !== indexToRemove,
      );
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
    let filtered = products.filter(
      (p) => p.category === activeStepConfig.category,
    );
    if (activeStepConfig.id === "Almacenamiento" && storageFilter !== "todos") {
      filtered = filtered.filter((p) => {
        const isSSD =
          p.name.toLowerCase().includes("ssd") ||
          p.specs?.Tipo?.toLowerCase().includes("ssd");
        return storageFilter === "ssd" ? isSSD : !isSSD;
      });
    }
    return filtered;
  }, [activeStepConfig, storageFilter]);

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="mb-8 border-b border-white/10 pb-6">
        <h1 className="text-3xl font-extrabold text-white">
          Configurador de PC
        </h1>
        <p className="mt-2 text-slate-400">
          Selecciona tus componentes. Nosotros la armamos.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* COLUMNA IZQUIERDA (Pasos) */}
        <div className="lg:col-span-8 space-y-4">
          <BuildStepList
            steps={STEPS}
            selection={selection}
            setActiveStepId={setActiveStepId}
            setStorageFilter={setStorageFilter}
            onRemove={handleRemove}
          />
        </div>

        {/* COLUMNA DERECHA (Resumen) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <BuildSummary
            flatSelection={flatSelection}
            hardwareTotal={hardwareTotal}
            totalPrice={totalPrice}
            isReadyToBuy={isReadyToBuy}
            includeAssembly={includeAssembly}
            setIncludeAssembly={setIncludeAssembly}
            assemblyService={assemblyService}
            onFinish={handleFinish}
            onDownloadPDF={handleDownloadPDF}
          />
        </div>
      </div>

      {/* MODAL */}
      <BuildStepModal
        activeStepId={activeStepId}
        activeStepConfig={activeStepConfig}
        storageFilter={storageFilter}
        setStorageFilter={setStorageFilter}
        modalProducts={modalProducts}
        onClose={() => setActiveStepId(null)}
        onSelect={handleSelect}
      />
    </div>
  );
}
