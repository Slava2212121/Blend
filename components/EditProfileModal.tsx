import React, { useState } from 'react';
import { X, Camera, Save, ShieldCheck, ChevronRight, AlertCircle } from 'lucide-react';
import { User } from '../types';

interface EditProfileModalProps {
  currentUser: User;
  onClose: () => void;
  onSave: (updates: Partial<User>) => void;
  onRequestOfficial: () => void;
  hasAppliedOfficial: boolean;
  t: any;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ currentUser, onClose, onSave, onRequestOfficial, hasAppliedOfficial, t }) => {
  const [formData, setFormData] = useState({
    name: currentUser.name,
    handle: currentUser.handle,
    bio: currentUser.bio || '',
    avatar: currentUser.avatar
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#111119] border border-[#202030] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#202030] shrink-0">
          <h2 className="text-[#F5F5FA] font-semibold">{t.profile.edit}</h2>
          <button onClick={onClose} className="text-[#A0A0C0] hover:text-[#F5F5FA] transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          
          {/* Avatar Preview */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative group cursor-pointer">
              <img src={formData.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-[#202030] object-cover" />
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <Camera size={24} className="text-white" />
              </div>
            </div>
            {/* Input for Avatar URL (Simplified for demo) */}
             <input 
              type="text" 
              placeholder="Avatar URL"
              value={formData.avatar}
              onChange={(e) => setFormData({...formData, avatar: e.target.value})}
              className="mt-4 w-full bg-[#0B0B10] border border-[#202030] rounded-lg px-3 py-2 text-sm text-[#F5F5FA] placeholder-[#707090] outline-none focus:border-[#5B8CFF]"
            />
          </div>

          <div className="space-y-1">
             <label className="text-xs text-[#707090] uppercase font-bold ml-1">{t.auth.name}</label>
             <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-[#0B0B10] border border-[#202030] rounded-xl px-4 py-3 text-[#F5F5FA] outline-none focus:border-[#5B8CFF] transition-colors"
            />
          </div>

          <div className="space-y-1">
             <label className="text-xs text-[#707090] uppercase font-bold ml-1">{t.auth.handle}</label>
             <input 
              type="text" 
              required
              value={formData.handle}
              onChange={(e) => setFormData({...formData, handle: e.target.value})}
              className="w-full bg-[#0B0B10] border border-[#202030] rounded-xl px-4 py-3 text-[#F5F5FA] outline-none focus:border-[#5B8CFF] transition-colors"
            />
          </div>

          <div className="space-y-1">
             <label className="text-xs text-[#707090] uppercase font-bold ml-1">{t.profile.bio}</label>
             <textarea 
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="w-full bg-[#0B0B10] border border-[#202030] rounded-xl px-4 py-3 text-[#F5F5FA] outline-none focus:border-[#5B8CFF] transition-colors resize-none"
            />
          </div>

          {/* Official Status Request Section */}
          {!currentUser.isOfficial && (
             <div className="pt-4 border-t border-[#202030] mt-4">
                <label className="text-xs text-[#707090] uppercase font-bold ml-1 mb-2 block">Verification</label>
                <button 
                  type="button"
                  onClick={onRequestOfficial}
                  disabled={hasAppliedOfficial}
                  className="w-full flex items-center justify-between p-3 bg-[#15151f] border border-[#202030] rounded-xl hover:bg-[#202030] transition-colors group disabled:opacity-50"
                >
                   <div className="flex items-center gap-3">
                      <ShieldCheck size={18} className="text-[#A0A0C0] group-hover:text-yellow-400 transition-colors" />
                      <span className="text-[#F5F5FA] text-sm font-medium">
                         {hasAppliedOfficial ? t.settings.officialPending : t.settings.officialRequest}
                      </span>
                   </div>
                   {!hasAppliedOfficial && <ChevronRight size={16} className="text-[#707090]" />}
                </button>
             </div>
          )}

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-[#5B8CFF] to-[#7B5BFF] text-white py-3.5 rounded-xl font-bold mt-4 hover:shadow-[0_0_20px_rgba(91,140,255,0.3)] transition-all flex items-center justify-center gap-2"
          >
            <Save size={20} />
            {t.profile.save}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;