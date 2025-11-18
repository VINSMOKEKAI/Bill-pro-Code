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

export function ModernTemplate({ billData }: TemplateProps) {
  const currencySymbol = currencySymbols[billData.currency] || '$';
  
  const subtotal = billData.items.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = (subtotal * billData.tax) / 100;
  const discountAmount = (subtotal * billData.discount) / 100;
  const total = subtotal + taxAmount - discountAmount;

  return (
    <div className="p-12 print:p-8 bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white p-8 -m-12 mb-12 print:-m-8 print:mb-12">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="mb-3">{billData.companyName}</h1>
            <div className="text-slate-300 space-y-1">
              <p>{billData.companyAddress}</p>
              <p>{billData.companyEmail}</p>
              <p>{billData.companyPhone}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white text-slate-900 px-6 py-4 inline-block">
              <p className="text-slate-500">INVOICE</p>
              <p className="text-slate-900">{billData.billNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bill Info */}
      <div className="grid grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="text-slate-900 mb-3">Bill To</h3>
          <p className="text-slate-900">{billData.clientName}</p>
          <p className="text-slate-600">{billData.clientAddress}</p>
          <p className="text-slate-600">{billData.clientEmail}</p>
        </div>
        <div className="text-right">
          <div className="space-y-2">
            <div>
              <span className="text-slate-500">Issue Date: </span>
              <span className="text-slate-900">{new Date(billData.billDate).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-slate-500">Due Date: </span>
              <span className="text-slate-900">{new Date(billData.dueDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-10">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-slate-900">
              <th className="text-left py-3 text-slate-900">Description</th>
              <th className="text-right py-3 text-slate-900">Quantity</th>
              <th className="text-right py-3 text-slate-900">Rate</th>
              <th className="text-right py-3 text-slate-900">Amount</th>
            </tr>
          </thead>
          <tbody>
            {billData.items.map((item) => (
              <tr key={item.id} className="border-b border-slate-200">
                <td className="py-4 text-slate-900">{item.description}</td>
                <td className="text-right py-4 text-slate-600">{item.quantity}</td>
                <td className="text-right py-4 text-slate-600">
                  {currencySymbol}{item.rate.toFixed(2)}
                </td>
                <td className="text-right py-4 text-slate-900">
                  {currencySymbol}{item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-10">
        <div className="w-80">
          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-slate-600">Subtotal</span>
              <span className="text-slate-900">{currencySymbol}{subtotal.toFixed(2)}</span>
            </div>
            {billData.discount > 0 && (
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Discount ({billData.discount}%)</span>
                <span className="text-slate-900">-{currencySymbol}{discountAmount.toFixed(2)}</span>
              </div>
            )}
            {billData.tax > 0 && (
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Tax ({billData.tax}%)</span>
                <span className="text-slate-900">{currencySymbol}{taxAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t-2 border-slate-900">
              <span className="text-slate-900">Total</span>
              <span className="text-slate-900">{currencySymbol}{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {billData.notes && (
        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-slate-900 mb-2">Notes</h3>
          <p className="text-slate-600 whitespace-pre-line">{billData.notes}</p>
        </div>
      )}
    </div>
  );
}
