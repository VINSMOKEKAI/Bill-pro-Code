import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (template: string) => void;
}

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary',
    color: 'bg-slate-900',
    preview: 'border-l-4 border-slate-900',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional professional',
    color: 'bg-slate-700',
    preview: 'border-l-4 border-slate-700',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple and elegant',
    color: 'bg-slate-800',
    preview: 'border-l-4 border-slate-800',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Bold and structured',
    color: 'bg-slate-600',
    preview: 'border-l-4 border-slate-600',
  },
];

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="p-4 space-y-2">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelectTemplate(template.id)}
          className={`w-full text-left p-3 rounded-lg border transition-all ${
            selectedTemplate === template.id
              ? 'border-blue-600 bg-blue-50 shadow-sm'
              : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${template.color} ${template.preview} flex items-center justify-center shadow-sm`}>
              <div className="w-4 h-4 bg-white/20 rounded" />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-900">{template.name}</h3>
              <p className="text-slate-600">{template.description}</p>
            </div>
            {selectedTemplate === template.id && (
              <div className="p-1 bg-blue-600 rounded-full">
                <Check className="size-3 text-white" />
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}