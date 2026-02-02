
import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, ChevronLeft, MapPin, Globe } from 'lucide-react';
import { Language } from '../types';

interface OnboardingTutorialProps {
  onClose: () => void;
  t: any;
  lang: Language;
  setLang: (lang: Language) => void;
}

const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({ onClose, t, lang, setLang }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const steps = [
    // Step 0: Welcome Screen (No target)
    {
      id: null,
      title: t.tutorial.welcomeTitle,
      description: t.tutorial.welcomeMessage
    },
    // Step 1: Sidebar
    {
      id: 'app-sidebar',
      title: t.tutorial.steps.sidebar,
      description: t.tutorial.steps.sidebarDesc,
      position: 'right'
    },
    // Step 2: Feed Header / Controls
    {
      id: 'feed-header',
      title: t.tutorial.steps.feed,
      description: t.tutorial.steps.feedDesc,
      position: 'bottom'
    },
    // Step 3: Create Button
    {
      id: 'create-btn',
      title: t.tutorial.steps.create,
      description: t.tutorial.steps.createDesc,
      position: 'top' // Usually at bottom
    },
    // Step 4: Widgets (Desktop only usually)
    {
      id: 'widgets-sidebar',
      title: t.tutorial.steps.widgets,
      description: t.tutorial.steps.widgetsDesc,
      position: 'left'
    }
  ];

  useEffect(() => {
    updateTargetPosition();
    window.addEventListener('resize', updateTargetPosition);
    return () => window.removeEventListener('resize', updateTargetPosition);
  }, [currentStep]);

  const updateTargetPosition = () => {
    const step = steps[currentStep];
    if (step.id) {
      const element = document.getElementById(step.id);
      if (element) {
        // Scroll to element to ensure visibility
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Wait a bit for scroll to finish then calc rect
        setTimeout(() => {
           setTargetRect(element.getBoundingClientRect());
        }, 300);
      } else {
        // Element not found (e.g. mobile view missing widget sidebar)
        // Auto-skip this step
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            onClose();
        }
      }
    } else {
      setTargetRect(null); // Welcome screen
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const activeStep = steps[currentStep];

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Dimmed Background with cutout logic (simplified via separate overlays) */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-all duration-500">
         {/* If we have a target, we create a "hole" or just highlight it. 
             Implementing a true CSS mask is complex, so we'll use a glowing border overlay on top of the target.
         */}
      </div>

      {/* Target Highlighter */}
      {targetRect && (
        <div 
          className="absolute border-4 border-[var(--primary)] rounded-xl shadow-[0_0_50px_rgba(91,140,255,0.5)] transition-all duration-300 pointer-events-none z-[101]"
          style={{
            top: targetRect.top - 4,
            left: targetRect.left - 4,
            width: targetRect.width + 8,
            height: targetRect.height + 8,
          }}
        />
      )}

      {/* Tutorial Card */}
      <div 
         className="absolute z-[102] transition-all duration-300 flex items-center justify-center w-full h-full pointer-events-none"
      >
         {/* We position the card absolutely based on the target, or center if no target */}
         <div 
            className="bg-[#111119] border border-[#202030] p-6 rounded-2xl shadow-2xl max-w-sm w-full pointer-events-auto relative animate-in zoom-in fade-in slide-in-from-bottom-4 duration-300"
            style={targetRect ? {
               position: 'absolute',
               // Simple positioning logic
               top: activeStep.position === 'bottom' ? targetRect.bottom + 20 : undefined,
               bottom: activeStep.position === 'top' ? window.innerHeight - targetRect.top + 20 : undefined,
               left: activeStep.position === 'right' ? targetRect.right + 20 : (activeStep.position === 'left' ? undefined : Math.max(20, targetRect.left)),
               right: activeStep.position === 'left' ? window.innerWidth - targetRect.left + 20 : undefined,
            } : {}}
         >
            <div className="flex justify-between items-start mb-4">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm shrink-0">
                     {currentStep + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-main)]">{activeStep.title}</h3>
               </div>
               
               <div className="flex items-center gap-3">
                  {/* Language Switcher inside Tutorial */}
                  <div className="flex bg-[#202030] rounded-lg p-0.5">
                    {(['en', 'ru', 'zh'] as Language[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase transition-all ${
                          lang === l ? 'bg-[var(--primary)] text-white' : 'text-[#707090] hover:text-[#F5F5FA]'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>

                  <button onClick={onClose} className="text-[#707090] hover:text-[var(--text-main)]">
                      <X size={20} />
                  </button>
               </div>
            </div>
            
            <p className="text-[var(--text-muted)] mb-6 text-sm leading-relaxed">
               {activeStep.description}
            </p>

            <div className="flex items-center justify-between">
               <div className="flex gap-1">
                  {steps.map((_, i) => (
                     <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentStep ? 'w-6 bg-[var(--primary)]' : 'w-1.5 bg-[#202030]'}`} />
                  ))}
               </div>
               <div className="flex gap-3">
                  <button 
                     onClick={onClose}
                     className="text-xs font-bold text-[#707090] hover:text-[var(--text-main)] transition-colors"
                  >
                     {t.tutorial.skip}
                  </button>
                  <button 
                     onClick={handleNext}
                     className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[var(--primary)]/80 transition-colors flex items-center gap-1"
                  >
                     {currentStep === steps.length - 1 ? t.tutorial.finish : t.tutorial.next}
                     {currentStep < steps.length - 1 && <ChevronRight size={16} />}
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default OnboardingTutorial;
