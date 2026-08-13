import { useEffect } from "react";
import Image from "next/image";
import { X, Plus } from "lucide-react";
import { Product } from "@/types/product";

type StorageFilterType = "todos" | "ssd" | "hdd";

interface BuildStepModalProps {
  activeStepId: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activeStepConfig: any;
  storageFilter: StorageFilterType;
  setStorageFilter: (filter: StorageFilterType) => void;
  modalProducts: Product[];
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect: (product: Product, stepConfig: any) => void;
}

export default function BuildStepModal({
  activeStepId,
  activeStepConfig,
  storageFilter,
  setStorageFilter,
  modalProducts,
  onClose,
  onSelect,
}: BuildStepModalProps) {
  useEffect(() => {
    if (activeStepId) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activeStepId, onClose]);

  if (!activeStepId || !activeStepConfig) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 p-0 sm:p-4 backdrop-blur-sm animate-fade-in">
      <div className="flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white/5 backdrop-blur-md shadow-2xl animate-slide-up sm:animate-zoom-in">
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <activeStepConfig.icon className="text-neon-green" size={24} />
            <h2 className="text-xl font-bold text-white">
              Seleccionar {activeStepConfig.label}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-white/5 p-2 text-slate-400 hover:bg-slate-200"
          >
            <X size={20} />
          </button>
        </div>
        {activeStepConfig.hasFilters && (
          <div className="flex gap-2 border-b border-white/10 p-4 bg-black/20">
            <span className="text-sm font-bold text-slate-300 py-2">Tipo:</span>
            {(["todos", "ssd", "hdd"] as StorageFilterType[]).map((filtro) => (
              <button
                key={filtro}
                onClick={() => setStorageFilter(filtro)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                  storageFilter === filtro
                    ? "bg-neon-green text-black font-bold border-none "
                    : "bg-white/5 backdrop-blur-md border border-white/10 text-slate-400 hover:bg-neon-green/10 hover:text-neon-green"
                }`}
              >
                {filtro === "ssd"
                  ? "Sólido (SSD)"
                  : filtro === "hdd"
                    ? "Rígido (HDD)"
                    : filtro}
              </button>
            ))}
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-5 bg-black/20">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {modalProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelect(product, activeStepConfig)}
                className="group cursor-pointer flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 transition-all hover:border-blue-500 hover:shadow-md active:scale-[0.98]"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/20 p-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white line-clamp-2 group-hover:text-neon-green transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-lg font-bold text-neon-green">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
                <button className="mt-auto rounded-full bg-neon-green/10 p-2 text-neon-green group-hover:bg-neon-green text-black font-bold border-none group-hover:">
                  <Plus size={20} />
                </button>
              </div>
            ))}
            {modalProducts.length === 0 && (
              <div className="col-span-full py-16 text-center text-slate-400">
                No se encontraron componentes.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
