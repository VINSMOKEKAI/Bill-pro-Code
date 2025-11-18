import { useState } from 'react';
import { BillEditor } from './components/BillEditor';
import { TemplateSelector } from './components/TemplateSelector';
import { BillPreview } from './components/BillPreview';
import { Button } from './components/ui/button';
import { Download, Eye, Edit3, FileText, RotateCcw } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TotalsCard } from './components/TotalsCard';

export interface BillItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface BillData {
  // Company Info
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  companyLogo?: string;
  
  // Bill To
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  
  // Bill Details
  billNumber: string;
  billDate: string;
  dueDate: string;
  currency: string;
  
  // Items
  items: BillItem[];
  
  // Additional
  notes: string;
  tax: number;
  discount: number;
}

const initialBillData: BillData = {
  companyName: 'Your Company Name',
  companyAddress: '123 Business Street, City, State 12345',
  companyEmail: 'hello@yourcompany.com',
  companyPhone: '+1 (555) 123-4567',
  
  clientName: 'Client Name',
  clientAddress: '456 Client Avenue, City, State 67890',
  clientEmail: 'client@email.com',
  
  billNumber: 'INV-001',
  billDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  currency: 'USD',
  
  items: [
    { id: '1', description: 'Service or Product 1', quantity: 1, rate: 100, amount: 100 },
    { id: '2', description: 'Service or Product 2', quantity: 2, rate: 75, amount: 150 },
  ],
  
  notes: 'Thank you for your business!',
  tax: 10,
  discount: 0,
};

export default function App() {
  const [billData, setBillData] = useLocalStorage<BillData>('billData', initialBillData);
  const [selectedTemplate, setSelectedTemplate] = useLocalStorage<string>('selectedTemplate', 'modern');
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [activeTab, setActiveTab] = useState<'company' | 'client' | 'items' | 'settings'>('company');

  const handlePrint = () => {
    window.print();
  };

  const handleNewBill = () => {
    if (confirm('Create a new bill? Current bill data will be saved.')) {
      const newBillNumber = `INV-${String(parseInt(billData.billNumber.split('-')[1] || '1') + 1).padStart(3, '0')}`;
      setBillData({
        ...billData,
        clientName: '',
        clientAddress: '',
        clientEmail: '',
        billNumber: newBillNumber,
        billDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        items: [],
        notes: 'Thank you for your business!',
        tax: billData.tax,
        discount: 0,
      });
      setActiveTab('client');
    }
  };

  const handleReset = () => {
    if (confirm('Reset to default template? This will clear all current data.')) {
      setBillData(initialBillData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 print:hidden sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <FileText className="size-6 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900">Bill Creator Pro</h1>
                <p className="text-slate-600">Create professional bills with ease</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleNewBill}
                className="border-slate-300 hover:bg-slate-50"
              >
                <FileText className="size-4 mr-2" />
                New Bill
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="border-slate-300 hover:bg-slate-50"
              >
                <RotateCcw className="size-4 mr-2" />
                Reset
              </Button>
              <div className="w-px h-8 bg-slate-200 mx-2" />
              <Button
                variant={viewMode === 'edit' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('edit')}
                className={viewMode === 'edit' ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-300 hover:bg-slate-50'}
              >
                <Edit3 className="size-4 mr-2" />
                Edit
              </Button>
              <Button
                variant={viewMode === 'preview' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('preview')}
                className={viewMode === 'preview' ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-300 hover:bg-slate-50'}
              >
                <Eye className="size-4 mr-2" />
                Preview
              </Button>
              <Button 
                size="sm" 
                onClick={handlePrint}
                className="bg-green-600 hover:bg-green-700"
              >
                <Download className="size-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:max-w-full">
        {/* Editor Section - Now on top */}
        {viewMode === 'edit' && (
          <div className="mb-6 print:hidden">
            <div className="bg-white rounded-xl border border-slate-200 shadow-lg">
              <BillEditor 
                billData={billData} 
                onUpdate={setBillData}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>
          </div>
        )}

        {/* Template and Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 print:grid-cols-1 print:gap-0">
          {/* Sidebar */}
          {viewMode === 'edit' && (
            <div className="lg:col-span-3 print:hidden space-y-6">
              {/* Template Selector */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-lg sticky top-24">
                <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-xl">
                  <h2 className="text-slate-900">Template</h2>
                  <p className="text-slate-600">Choose your style</p>
                </div>
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  onSelectTemplate={setSelectedTemplate}
                />
              </div>

              {/* Live Totals */}
              <TotalsCard billData={billData} />
            </div>
          )}

          {/* Preview */}
          <div className={viewMode === 'edit' ? 'lg:col-span-9' : 'lg:col-span-12 print:col-span-1'}>
            <BillPreview billData={billData} template={selectedTemplate} />
          </div>
        </div>
      </main>
    </div>
  );
}