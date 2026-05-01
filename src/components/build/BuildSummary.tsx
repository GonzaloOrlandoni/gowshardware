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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900">
        <ShoppingCart className="text-blue-600" /> Resumen
      </h2>

      {assemblyService && (
        <div
          onClick={() => setIncludeAssembly(!includeAssembly)}
          className={`mb-6 flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${
            includeAssembly
              ? "border-green-500 bg-green-50"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`rounded-full p-2 ${
                includeAssembly
                  ? "bg-green-500 text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              <Wrench size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-900">Servicio de Armado</p>
              <p className="text-sm text-slate-600">
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

      <div className="space-y-3 border-b border-slate-100 pb-6 text-sm text-slate-600">
        <div className="flex justify-between">
          <span>Hardware ({flatSelection.length} items)</span>
          <span>${hardwareTotal.toLocaleString()}</span>
        </div>
      </div>
      <div className="my-6 flex items-end justify-between">
        <span className="text-lg font-bold text-slate-900">Total Final</span>
        <div className="text-right">
          <span className="block text-3xl font-extrabold text-blue-600">
            ${totalPrice.toLocaleString()}
          </span>
          <span className="text-xs text-slate-500">IVA Incluido</span>
        </div>
      </div>

      <div className="grid gap-3">
        <button
          onClick={onFinish}
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
          onClick={onDownloadPDF}
          disabled={flatSelection.length === 0}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3 font-bold text-slate-700 transition-all hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FileDown size={20} /> Descargar Presupuesto
        </button>
      </div>
    </div>
  );
}
