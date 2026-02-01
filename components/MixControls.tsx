import React from 'react';
import { Settings2, Users, Flame, FileText, Video } from 'lucide-react';

interface MixControlsProps {
  mixValues: {
    friendsVsPopular: number; // 0 (Friends) to 100 (Popular)
    textVsVideo: number; // 0 (Text) to 100 (Video)
  };
  onChange: (key: 'friendsVsPopular' | 'textVsVideo', value: number) => void;
  t: any;
}

const MixControls: React.FC<MixControlsProps> = ({ mixValues, onChange, t }) => {
  return (
    <div className="bg-[#111119] border-b border-[#202030] px-4 py-3 animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center gap-2 mb-3 text-[#A0A0C0] text-xs font-bold uppercase tracking-wider">
        <Settings2 size={12} />
        <span>Algorithm Tuning</span>
      </div>

      <div className="space-y-4">
        {/* Friends vs Popular Slider */}
        <div className="flex items-center gap-3 text-sm">
           <Users size={16} className={mixValues.friendsVsPopular < 50 ? 'text-[#5B8CFF]' : 'text-[#707090]'} />
           <span className={`w-16 text-xs font-medium ${mixValues.friendsVsPopular < 50 ? 'text-[#F5F5FA]' : 'text-[#707090]'}`}>{t.feed.mixControls.friends}</span>
           
           <input 
             type="range" 
             min="0" 
             max="100" 
             value={mixValues.friendsVsPopular}
             onChange={(e) => onChange('friendsVsPopular', parseInt(e.target.value))}
             className="flex-1 h-1.5 bg-[#202030] rounded-lg appearance-none cursor-pointer accent-[#5B8CFF]"
           />
           
           <span className={`w-16 text-right text-xs font-medium ${mixValues.friendsVsPopular > 50 ? 'text-[#F5F5FA]' : 'text-[#707090]'}`}>{t.feed.mixControls.popular}</span>
           <Flame size={16} className={mixValues.friendsVsPopular > 50 ? 'text-[#FF5B5B]' : 'text-[#707090]'} />
        </div>

        {/* Text vs Video Slider */}
        <div className="flex items-center gap-3 text-sm">
           <FileText size={16} className={mixValues.textVsVideo < 50 ? 'text-[#5B8CFF]' : 'text-[#707090]'} />
           <span className={`w-16 text-xs font-medium ${mixValues.textVsVideo < 50 ? 'text-[#F5F5FA]' : 'text-[#707090]'}`}>{t.feed.mixControls.text}</span>
           
           <input 
             type="range" 
             min="0" 
             max="100" 
             value={mixValues.textVsVideo}
             onChange={(e) => onChange('textVsVideo', parseInt(e.target.value))}
             className="flex-1 h-1.5 bg-[#202030] rounded-lg appearance-none cursor-pointer accent-[#5B8CFF]"
           />
           
           <span className={`w-16 text-right text-xs font-medium ${mixValues.textVsVideo > 50 ? 'text-[#F5F5FA]' : 'text-[#707090]'}`}>{t.feed.mixControls.video}</span>
           <Video size={16} className={mixValues.textVsVideo > 50 ? 'text-[#5BFF8C]' : 'text-[#707090]'} />
        </div>
      </div>
    </div>
  );
};

export default MixControls;