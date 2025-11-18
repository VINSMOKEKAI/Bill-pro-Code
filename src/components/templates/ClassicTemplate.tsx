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

export function ClassicTemplate({ billData }: TemplateProps) {
  const currencySymbol = currencySymbols[billData.currency] || '$';
  
  const subtotal = billData.items.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = (subtotal * billData.tax) / 100;
  const discountAmount = (subtotal * billData.discount) / 100;
  const total = subtotal + taxAmount - discountAmount;

  return (
    <div className="p-12 print:p-8 bg-white">
      {/* Header */}
      <div className="border-b-4 border-slate-900 pb-8 mb-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-slate-900 mb-4">{billData.companyName}</h1>
            <div className="text-slate-600 space-y-1">
              <p>{billData.companyAddress}</p>
              <p>{billData.companyEmail}</p>
              <p>{billData.companyPhone}</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-slate-900 mb-2">INVOICE</h2>
            <p className="text-slate-600">#{billData.billNumber}</p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-8 mb-10">
        <div>
          <div className="border-l-4 border-slate-900 pl-4">
            <h3 className="text-slate-900 mb-3">Bill To</h3>
            <div className="space-y-1">
              <p className="text-slate-900">{billData.clientName}</p>
              <p className="text-slate-600">{billData.clientAddress}</p>
              <p className="text-slate-600">{billData.clientEmail}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="border-l-4 border-slate-300 pl-4">
            <h3 className="text-slate-900 mb-3">Invoice Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Issue Date</span>
                <span className="text-slate-900">{new Date(billData.billDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Due Date</span>
                <span className="text-slate-900">{new Date(billData.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Currency</span>
                <span className="text-slate-900">{billData.currency}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-10">
        <table className="w-full border border-slate-300">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="text-left p-4">Description</th>
              <th className="text-right p-4">Qty</th>
              <th className="text-right p-4">Rate</th>
              <th className="text-right p-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {billData.items.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="p-4 border-b border-slate-200 text-slate-900">{item.description}</td>
                <td className="text-right p-4 border-b border-slate-200 text-slate-600">{item.quantity}</td>
                <td className="text-right p-4 border-b border-slate-200 text-slate-600">
                  {currencySymbol}{item.rate.toFixed(2)}
                </td>
                <td className="text-right p-4 border-b border-slate-200 text-slate-900">
                  {currencySymbol}{item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-10">
        <div className="w-96">
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Subtotal</span>
              <span className="text-slate-900">{currencySymbol}{subtotal.toFixed(2)}</span>
            </div>
            {billData.discount > 0 && (
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Discount ({billData.discount}%)</span>
                <span className="text-slate-900">-{currencySymbol}{discountAmount.toFixed(2)}</span>
              </div>
            )}
            {billData.tax > 0 && (
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Tax ({billData.tax}%)</span>
                <span className="text-slate-900">{currencySymbol}{taxAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="bg-slate-900 text-white p-4">
              <div className="flex justify-between">
                <span>Total Amount</span>
                <span>{currencySymbol}{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {billData.notes && (
        <div className="border-t-2 border-slate-300 pt-6">
          <h3 className="text-slate-900 mb-3">Notes & Terms</h3>
          <p className="text-slate-600 whitespace-pre-line">{billData.notes}</p>
        </div>
      )}
    </div>
  );
}
