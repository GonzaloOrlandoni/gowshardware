import {
  ShoppingCart,
  Wrench,
  Check,
  CheckCircle,
  FileDown,
} from "lucide-react";
import { Product } from "@/types/product";

interface BuildSummaryProps {
  flatSelection: Product[];
  hardwareTotal: number;
  totalPrice: number;
  isReadyToBuy: boolean;
  includeAssembly: boolean;
  setIncludeAssembly: (val: boolean) => void;
  assemblyService?: Product;
  onFinish: () => void;
  onDownloadPDF: () => void;
}

export default function BuildSummary({
  flatSelection,
  hardwareTotal,
  totalPrice,
  isReadyToBuy,
  includeAssembly,
  setIncludeAssembly,
  assemblyService,
  onFinish,
  onDownloadPDF,
}: BuildSummaryProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl shadow-slate-200/50">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
        <ShoppingCart className="text-neon-green" /> Resumen
      </h2>

      {assemblyService && (
        <div
          onClick={() => setIncludeAssembly(!includeAssembly)}
          className={`mb-6 flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${
            includeAssembly
              ? "border-green-500 bg-green-50"
              : "border-white/10 hover:border-white/20"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`rounded-full p-2 ${
                includeAssembly
                  ? "bg-green-500 text-white"
                  : "bg-slate-200 text-slate-400"
              }`}
            >
              <Wrench size={20} />
            </div>
            <div>
              <p className="font-bold text-white">Servicio de Armado</p>
              <p className="text-sm text-slate-400">
                {includeAssembly ? "Incluido" : "No incluir"}
              </p>
            </div>
          </div>
          <div className="text-right">
            {includeAssembly && (
              <Check size={20} className="text-green-600 ml-auto mb-1" />
            )}
            <p
              className={`font-bold ${includeAssembly ? "text-green-700" : "text-slate-400"}`}
            >
              ${assemblyService.price.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3 border-b border-white/10 pb-6 text-sm text-slate-400">
        <div className="flex justify-between">
          <span>Hardware ({flatSelection.length} items)</span>
          <span>${hardwareTotal.toLocaleString()}</span>
        </div>
      </div>
      <div className="my-6 flex items-end justify-between">
        <span className="text-lg font-bold text-white">Total Final</span>
        <div className="text-right">
          <span className="block text-3xl font-extrabold text-neon-green">
            ${totalPrice.toLocaleString()}
          </span>
          <span className="text-xs text-slate-400">IVA Incluido</span>
        </div>
      </div>

      <div className="grid gap-3">
        <button
          onClick={onFinish}
          disabled={!isReadyToBuy || flatSelection.length === 0}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-neon-green text-black font-bold border-none py-4 text-lg font-bold  transition-all hover:bg-white hover:text-black hover:shadow-[0_0_15px_#ccff00] hover:shadow-lg hover:shadow-blue-600/30 disabled:bg-slate-300 disabled:cursor-not-allowed"
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
          onClick={onDownloadPDF}
          disabled={flatSelection.length === 0}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md py-3 font-bold text-slate-300 transition-all hover:bg-black/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FileDown size={20} /> Descargar Presupuesto
        </button>
      </div>
    </div>
  );
}
