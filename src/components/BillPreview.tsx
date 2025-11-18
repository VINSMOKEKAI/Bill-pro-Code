import { BillData } from '../App';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { MinimalistTemplate } from './templates/MinimalistTemplate';
import { CorporateTemplate } from './templates/CorporateTemplate';

interface BillPreviewProps {
  billData: BillData;
  template: string;
}

export function BillPreview({ billData, template }: BillPreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate billData={billData} />;
      case 'classic':
        return <ClassicTemplate billData={billData} />;
      case 'minimalist':
        return <MinimalistTemplate billData={billData} />;
      case 'corporate':
        return <CorporateTemplate billData={billData} />;
      default:
        return <ModernTemplate billData={billData} />;
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-xl overflow-hidden border border-slate-200 print:shadow-none print:border-0 print:rounded-none">
      {renderTemplate()}
    </div>
  );
}