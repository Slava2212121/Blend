import React from 'react';
import { X, FileText, Shield } from 'lucide-react';

interface LegalModalProps {
  type: 'TERMS' | 'PRIVACY';
  onClose: () => void;
  t: any;
}

const LegalModal: React.FC<LegalModalProps> = ({ type, onClose, t }) => {
  const content = type === 'TERMS' ? t.legal.terms : t.legal.privacy;
  const Icon = type === 'TERMS' ? FileText : Shield;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[var(--bg-card)] border border-[var(--border)] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)] bg-[var(--bg-main)]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--bg-hover)] rounded-full text-[var(--primary)]">
              <Icon size={24} />
            </div>
            <div>
              <h2 className="text-[var(--text-main)] font-bold text-lg">{content.title}</h2>
              <p className="text-[var(--text-muted)] text-xs">{content.date}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors p-2 hover:bg-[var(--bg-hover)] rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">
          {content.sections.map((section: any, idx: number) => (
            <div key={idx} className="space-y-2">
               <h3 className="text-[var(--text-main)] font-bold text-base border-l-4 border-[var(--primary)] pl-3">
                 {section.heading}
               </h3>
               <p className="text-[var(--text-muted)] text-sm leading-relaxed pl-4">
                 {section.content}
               </p>
            </div>
          ))}

          <div className="pt-8 border-t border-[var(--border)] mt-8 text-center">
            <p className="text-[var(--text-muted)] text-xs italic">
              Blend Platform • Open Source Initiative • 2026
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[var(--border)] bg-[var(--bg-main)] flex justify-end">
          <button 
            onClick={onClose}
            className="bg-[var(--bg-hover)] text-[var(--text-main)] px-6 py-2.5 rounded-xl font-medium hover:bg-[var(--border)] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;