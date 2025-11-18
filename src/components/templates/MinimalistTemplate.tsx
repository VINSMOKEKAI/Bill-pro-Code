import { BillData } from '../../App';

interface TemplateProps {
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

export function MinimalistTemplate({ billData }: TemplateProps) {
  const currencySymbol = currencySymbols[billData.currency] || '$';
  
  const subtotal = billData.items.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = (subtotal * billData.tax) / 100;
  const discountAmount = (subtotal * billData.discount) / 100;
  const total = subtotal + taxAmount - discountAmount;

  return (
    <div className="p-16 print:p-8 max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-slate-900 mb-2">{billData.companyName}</h1>
        <div className="flex justify-between items-start text-slate-500">
          <div className="space-y-0.5">
            <p>{billData.companyEmail}</p>
            <p>{billData.companyPhone}</p>
          </div>
          <div className="text-right">
            <p>Invoice</p>
            <p className="text-slate-900">{billData.billNumber}</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-900 mb-12" />

      {/* Info */}
      <div className="grid grid-cols-2 gap-16 mb-16">
        <div>
          <p className="text-slate-500 mb-3">To</p>
          <p className="text-slate-900 mb-2">{billData.clientName}</p>
          <p className="text-slate-500">{billData.clientEmail}</p>
        </div>
        <div className="text-right">
          <div className="space-y-3">
            <div>
              <span className="text-slate-500">Issued </span>
              <span className="text-slate-900">{new Date(billData.billDate).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-slate-500">Due </span>
              <span className="text-slate-900">{new Date(billData.dueDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="mb-16">
        <div className="border-b border-slate-900 pb-4 mb-6">
          <div className="grid grid-cols-12 gap-4 text-slate-500">
            <div className="col-span-6">Item</div>
            <div className="col-span-2 text-right">Qty</div>
            <div className="col-span-2 text-right">Rate</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>
        </div>
        <div className="space-y-4">
          {billData.items.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-4 py-2">
              <div className="col-span-6 text-slate-900">{item.description}</div>
              <div className="col-span-2 text-right text-slate-600">{item.quantity}</div>
              <div className="col-span-2 text-right text-slate-600">
                {currencySymbol}{item.rate.toFixed(2)}
              </div>
              <div className="col-span-2 text-right text-slate-900">
                {currencySymbol}{item.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-200 mb-12" />

      {/* Totals */}
      <div className="flex justify-end mb-16">
        <div className="w-80 space-y-4">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{currencySymbol}{subtotal.toFixed(2)}</span>
          </div>
          {billData.discount > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>Discount ({billData.discount}%)</span>
              <span>-{currencySymbol}{discountAmount.toFixed(2)}</span>
            </div>
          )}
          {billData.tax > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>Tax ({billData.tax}%)</span>
              <span>{currencySymbol}{taxAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="h-px bg-slate-900 my-4" />
          <div className="flex justify-between text-slate-900">
            <span>Total</span>
            <span>{currencySymbol}{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {billData.notes && (
        <div>
          <p className="text-slate-500 mb-3">Notes</p>
          <p className="text-slate-600 whitespace-pre-line">{billData.notes}</p>
        </div>
      )}
    </div>
  );
}
