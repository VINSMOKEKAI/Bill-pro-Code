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

export function CorporateTemplate({ billData }: TemplateProps) {
  const currencySymbol = currencySymbols[billData.currency] || '$';
  
  const subtotal = billData.items.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = (subtotal * billData.tax) / 100;
  const discountAmount = (subtotal * billData.discount) / 100;
  const total = subtotal + taxAmount - discountAmount;

  return (
    <div className="p-12 print:p-8 bg-white">
      {/* Header */}
      <div className="bg-slate-800 text-white p-8 -m-12 mb-12 print:-m-8 print:mb-12">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="mb-4">{billData.companyName}</h1>
            <div className="space-y-1 text-slate-300">
              <p>{billData.companyAddress}</p>
              <p>{billData.companyEmail} • {billData.companyPhone}</p>
            </div>
          </div>
          <div className="bg-white text-slate-900 px-8 py-4">
            <p className="text-slate-500">INVOICE</p>
            <p className="text-slate-900">{billData.billNumber}</p>
          </div>
        </div>
      </div>

      {/* Client and Dates */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="col-span-2 border-l-4 border-slate-800 pl-6 py-4">
          <p className="text-slate-500 mb-2">BILL TO</p>
          <p className="text-slate-900 mb-1">{billData.clientName}</p>
          <p className="text-slate-600">{billData.clientAddress}</p>
          <p className="text-slate-600">{billData.clientEmail}</p>
        </div>
        <div className="py-4">
          <div className="space-y-3">
            <div>
              <p className="text-slate-500">Issue Date</p>
              <p className="text-slate-900">{new Date(billData.billDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-slate-500">Due Date</p>
              <p className="text-slate-900">{new Date(billData.dueDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-10">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100 border-b-2 border-slate-800">
              <th className="text-left p-4 text-slate-900">DESCRIPTION</th>
              <th className="text-right p-4 text-slate-900">QTY</th>
              <th className="text-right p-4 text-slate-900">RATE</th>
              <th className="text-right p-4 text-slate-900">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {billData.items.map((item) => (
              <tr key={item.id} className="border-b border-slate-200">
                <td className="p-4 text-slate-900">{item.description}</td>
                <td className="text-right p-4 text-slate-600">{item.quantity}</td>
                <td className="text-right p-4 text-slate-600">
                  {currencySymbol}{item.rate.toFixed(2)}
                </td>
                <td className="text-right p-4 text-slate-900">
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
          <div className="space-y-3 mb-4">
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
          </div>
          <div className="bg-slate-800 text-white p-6">
            <div className="flex justify-between items-center">
              <span>TOTAL DUE</span>
              <span>{currencySymbol}{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {billData.notes && (
        <div className="border-l-4 border-slate-800 pl-6 py-4">
          <p className="text-slate-500 mb-2">NOTES</p>
          <p className="text-slate-600 whitespace-pre-line">{billData.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-10 pt-6 border-t border-slate-200 text-center text-slate-500">
        <p>Thank you for your business</p>
      </div>
    </div>
  );
}
