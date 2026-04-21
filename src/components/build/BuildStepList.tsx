import Image from "next/image";
import { X, AlertCircle } from "lucide-react";
import { Product } from "@/types/product";

interface BuildStepListProps {
  steps: any[];
  selection: Record<string, Product[]>;
  setActiveStepId: (id: string) => void;
  setStorageFilter: (filter: any) => void;
  onRemove: (stepId: string, index: number) => void;
}

export default function BuildStepList({
  steps,
  selection,
  setActiveStepId,
  setStorageFilter,
  onRemove,
}: BuildStepListProps) {
  return (
    <div className="space-y-4">
      {steps.map((step) => {
        const selectedItems = selection[step.id] || [];
        const hasSelection = selectedItems.length > 0;
        const isMaxReached = step.multi && selectedItems.length >= (step.max || 1);

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
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${iconBgClass} transition-colors`}>
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
                      onClick={() => onRemove(step.id, idx)}
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
  );
}
