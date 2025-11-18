import { BillData, BillItem } from '../App';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Plus, Trash2, Building2, User, FileText, Settings, Copy, Upload, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useRef } from 'react';

interface BillEditorProps {
  billData: BillData;
  onUpdate: (data: BillData) => void;
  activeTab: 'company' | 'client' | 'items' | 'settings';
  onTabChange: (tab: 'company' | 'client' | 'items' | 'settings') => void;
}

const currencies = [
  { value: 'USD', label: '$ USD', symbol: '$' },
  { value: 'EUR', label: '€ EUR', symbol: '€' },
  { value: 'GBP', label: '£ GBP', symbol: '£' },
  { value: 'JPY', label: '¥ JPY', symbol: '¥' },
  { value: 'INR', label: '₹ INR', symbol: '₹' },
  { value: 'CAD', label: '$ CAD', symbol: '$' },
  { value: 'AUD', label: '$ AUD', symbol: '$' },
];

export function BillEditor({ billData, onUpdate, activeTab, onTabChange }: BillEditorProps) {
  const updateField = (field: keyof BillData, value: any) => {
    onUpdate({ ...billData, [field]: value });
  };

  const addItem = () => {
    const newItem: BillItem = {
      id: Date.now().toString(),
      description: 'New Item',
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    updateField('items', [...billData.items, newItem]);
  };

  const updateItem = (id: string, field: keyof BillItem, value: any) => {
    const updatedItems = billData.items.map((item) => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updated.amount = updated.quantity * updated.rate;
        }
        return updated;
      }
      return item;
    });
    updateField('items', updatedItems);
  };

  const removeItem = (id: string) => {
    updateField('items', billData.items.filter((item) => item.id !== id));
  };

  const duplicateItem = (item: BillItem) => {
    const newItem: BillItem = {
      ...item,
      id: Date.now().toString(),
    };
    updateField('items', [...billData.items, newItem]);
  };

  const tabs = [
    { id: 'company', label: 'Company', icon: Building2 },
    { id: 'client', label: 'Client', icon: User },
    { id: 'items', label: 'Items', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div>
      {/* Tabs */}
      <div className="border-b border-slate-200 bg-slate-50/50">
        <div className="flex gap-1 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 border-b-2 transition-all rounded-t-lg ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-white -mb-px'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon className="size-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'company' && (
          <div className="max-w-2xl space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={billData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="companyAddress">Address</Label>
              <Input
                id="companyAddress"
                value={billData.companyAddress}
                onChange={(e) => updateField('companyAddress', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyEmail">Email</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  value={billData.companyEmail}
                  onChange={(e) => updateField('companyEmail', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="companyPhone">Phone</Label>
                <Input
                  id="companyPhone"
                  value={billData.companyPhone}
                  onChange={(e) => updateField('companyPhone', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'client' && (
          <div className="max-w-2xl space-y-4">
            <div>
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={billData.clientName}
                onChange={(e) => updateField('clientName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="clientAddress">Address</Label>
              <Input
                id="clientAddress"
                value={billData.clientAddress}
                onChange={(e) => updateField('clientAddress', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="clientEmail">Email</Label>
              <Input
                id="clientEmail"
                type="email"
                value={billData.clientEmail}
                onChange={(e) => updateField('clientEmail', e.target.value)}
              />
            </div>
          </div>
        )}

        {activeTab === 'items' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-slate-600">Add items to your invoice</p>
              <Button onClick={addItem} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="size-4 mr-2" />
                Add Item
              </Button>
            </div>
            <div className="space-y-3">
              {billData.items.map((item, index) => (
                <div key={item.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <Label>Description</Label>
                      <Input
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="bg-white"
                      />
                    </div>
                    <div className="flex gap-2 pt-6">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => duplicateItem(item)}
                        className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
                        title="Duplicate item"
                      >
                        <Copy className="size-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                        title="Delete item"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        className="bg-white"
                      />
                    </div>
                    <div>
                      <Label>Rate</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        className="bg-white"
                      />
                    </div>
                    <div>
                      <Label>Amount</Label>
                      <Input value={item.amount.toFixed(2)} disabled className="bg-slate-100" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {billData.items.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-lg">
                <FileText className="size-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600 mb-4">No items added yet</p>
                <Button onClick={addItem} variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Plus className="size-4 mr-2" />
                  Add Your First Item
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-6">
            <div className="space-y-4">
              <h3 className="text-slate-900">Bill Information</h3>
              <div>
                <Label htmlFor="billNumber">Bill Number</Label>
                <Input
                  id="billNumber"
                  value={billData.billNumber}
                  onChange={(e) => updateField('billNumber', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="billDate">Bill Date</Label>
                  <Input
                    id="billDate"
                    type="date"
                    value={billData.billDate}
                    onChange={(e) => updateField('billDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={billData.dueDate}
                    onChange={(e) => updateField('dueDate', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select value={billData.currency} onValueChange={(value) => updateField('currency', value)}>
                  <SelectTrigger id="currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-200">
              <h3 className="text-slate-900">Additional Options</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tax">Tax (%)</Label>
                  <Input
                    id="tax"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={billData.tax}
                    onChange={(e) => updateField('tax', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={billData.discount}
                    onChange={(e) => updateField('discount', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={billData.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  rows={3}
                  placeholder="Add payment terms, thank you message, etc."
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}