import { BillData } from '../App';
import { Calculator } from 'lucide-react';

interface TotalsCardProps {
  billData: BillData;
}

const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  INR: '₹',
  CAD: '$',
  AUD: '$',
};

export function TotalsCard({ billData }: TotalsCardProps) {
  const currencySymbol = currencySymbols[billData.currency] || '$';
  
  const subtotal = billData.items.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = (subtotal * billData.tax) / 100;
  const discountAmount = (subtotal * billData.discount) / 100;
  const total = subtotal + taxAmount - discountAmount;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg sticky top-[calc(24rem)]">
      <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600 rounded-lg">
            <Calculator className="size-4 text-white" />
          </div>
          <div>
            <h2 className="text-slate-900">Summary</h2>
            <p className="text-slate-600">Live calculations</p>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span className="tabular-nums">{currencySymbol}{subtotal.toFixed(2)}</span>
        </div>
        {billData.discount > 0 && (
          <div className="flex justify-between">
            <span className="text-slate-600">Discount ({billData.discount}%)</span>
            <span className="text-green-600 tabular-nums">-{currencySymbol}{discountAmount.toFixed(2)}</span>
          </div>
        )}
        {billData.tax > 0 && (
          <div className="flex justify-between text-slate-600">
            <span>Tax ({billData.tax}%)</span>
            <span className="tabular-nums">+{currencySymbol}{taxAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="pt-3 border-t-2 border-blue-600">
          <div className="flex justify-between text-slate-900">
            <span>Total</span>
            <span className="tabular-nums">{currencySymbol}{total.toFixed(2)}</span>
          </div>
        </div>
        <div className="pt-3 border-t border-slate-200">
          <div className="flex items-center justify-center gap-2 text-slate-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p>{billData.items.length} item{billData.items.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>
    </div>
  );
}