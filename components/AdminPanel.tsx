
import React, { useState } from 'react';
import { 
  Users, 
  ShieldAlert, 
  Activity, 
  BarChart2, 
  Flag, 
  Search, 
  MoreHorizontal,
  Ban,
  CheckCircle,
  AlertTriangle,
  Server,
  Trash2,
  Unlock
} from 'lucide-react';
import { Post, User } from '../types';

interface AdminPanelProps {
  currentUser: User;
  posts: Post[];
  stats: {
    totalUsers: number;
    totalPosts: number;
    onlineUsers: number;
  };
  t: any;
  onBanUser: (userId: string) => void;
  onDeletePost: (postId: string) => void;
  onDismissReport: (postId: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  currentUser, 
  posts, 
  stats, 
  t,
  onBanUser,
  onDeletePost,
  onDismissReport
}) => {
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'USERS' | 'REPORTS'>('DASHBOARD');

  // Filter for Flagged Posts
  const flaggedPosts = posts.filter(p => p.isFlagged);
  
  // Extract unique users from posts for the User List + Current User
  const uniqueUsersMap = new Map<string, User>();
  uniqueUsersMap.set(currentUser.id, currentUser);
  posts.forEach(p => uniqueUsersMap.set(p.author.id, p.author));
  const allUsers = Array.from(uniqueUsersMap.values());

  const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 flex items-start justify-between">
       <div>
          <p className="text-[var(--text-muted)] text-xs font-bold uppercase mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-[var(--text-main)]">{value}</h3>
          {trend && <p className="text-[#10B981] text-xs mt-1 flex items-center gap-1">+{trend}% <span className="opacity-60">vs last week</span></p>}
       </div>
       <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={24} />
       </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto w-full pb-10">
      
      {/* Header */}
      <div className="sticky top-16 lg:top-0 bg-[var(--bg-main)]/90 backdrop-blur-md z-30 px-4 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-[#FF5B5B]/10 rounded-xl flex items-center justify-center border border-[#FF5B5B]/20">
              <ShieldAlert size={20} className="text-[#FF5B5B]" />
           </div>
           <div>
              <h2 className="text-xl font-bold text-[var(--text-main)]">{t.admin.title}</h2>
              <p className="text-[var(--text-muted)] text-xs">{t.admin.welcome}, {currentUser.name}</p>
           </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto">
           {[
             { id: 'DASHBOARD', label: t.admin.tabs.dashboard },
             { id: 'USERS', label: t.admin.tabs.users },
             { id: 'REPORTS', label: t.admin.tabs.reports }
           ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-[var(--text-main)] text-[var(--bg-main)]' : 'bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
              >
                 {tab.label}
              </button>
           ))}
        </div>
      </div>

      <div className="p-6">
        
        {activeTab === 'DASHBOARD' && (
           <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 <StatCard title={t.admin.stats.totalUsers} value={allUsers.length} icon={Users} color="bg-[#5B8CFF]/10 text-[#5B8CFF]" trend={12} />
                 <StatCard title={t.admin.stats.activePosts} value={posts.length} icon={BarChart2} color="bg-[#FFD700]/10 text-[#FFD700]" trend={5} />
                 <StatCard title={t.admin.stats.reports} value={flaggedPosts.length} icon={Flag} color="bg-[#FF5B5B]/10 text-[#FF5B5B]" />
                 <StatCard title={t.admin.stats.server} value="12%" icon={Server} color="bg-[#10B981]/10 text-[#10B981]" />
              </div>

              {/* Server Health Mock */}
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6">
                 <h3 className="font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
                    <Activity size={18} className="text-[#10B981]" /> {t.admin.health}
                 </h3>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                       <span className="text-[var(--text-muted)]">Database Latency</span>
                       <span className="text-[#10B981]">24ms</span>
                    </div>
                    <div className="w-full h-2 bg-[var(--bg-hover)] rounded-full overflow-hidden">
                       <div className="h-full bg-[#10B981] w-[15%]"></div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                       <span className="text-[var(--text-muted)]">API Response Time</span>
                       <span className="text-[#5B8CFF]">45ms</span>
                    </div>
                    <div className="w-full h-2 bg-[var(--bg-hover)] rounded-full overflow-hidden">
                       <div className="h-full bg-[#5B8CFF] w-[25%]"></div>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {activeTab === 'USERS' && (
           <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden animate-in fade-in">
              <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
                 <h3 className="font-bold text-[var(--text-main)]">{t.admin.usersList.title}</h3>
                 <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input 
                      type="text" 
                      placeholder={t.admin.usersList.search} 
                      className="bg-[var(--bg-main)] border border-[var(--border)] rounded-lg pl-9 pr-4 py-1.5 text-sm text-[var(--text-main)] outline-none focus:border-[#5B8CFF]"
                    />
                 </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                   <thead className="bg-[var(--bg-hover)] text-[var(--text-muted)] uppercase text-xs font-bold">
                      <tr>
                         <th className="px-6 py-3">{t.admin.usersList.colUser}</th>
                         <th className="px-6 py-3">{t.admin.usersList.colRole}</th>
                         <th className="px-6 py-3">{t.admin.usersList.colStatus}</th>
                         <th className="px-6 py-3 text-right">{t.admin.usersList.colActions}</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-[var(--border)]">
                      {allUsers.map(user => (
                         <tr key={user.id} className="hover:bg-[var(--bg-hover)] transition-colors">
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-3">
                                  <img src={user.avatar} className="w-8 h-8 rounded-full" alt="" />
                                  <div>
                                     <div className="font-medium text-[var(--text-main)]">{user.name}</div>
                                     <div className="text-[var(--text-muted)] text-xs">{user.handle}</div>
                                  </div>
                               </div>
                            </td>
                            <td className="px-6 py-4">
                               <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                  user.role === 'CREATOR' ? 'border-red-500/30 text-red-500 bg-red-500/10' :
                                  user.role === 'ADMIN' ? 'border-[#FFD700]/30 text-[#FFD700] bg-[#FFD700]/10' :
                                  'border-[var(--border)] text-[var(--text-muted)]'
                               }`}>
                                  {user.role || 'USER'}
                               </span>
                            </td>
                            <td className="px-6 py-4">
                               {user.isBanned ? (
                                  <span className="flex items-center gap-1.5 text-[#FF5B5B] text-xs font-medium">
                                     <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B5B]"></span> BANNED
                                  </span>
                               ) : (
                                  <span className="flex items-center gap-1.5 text-[#10B981] text-xs font-medium">
                                     <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span> Active
                                  </span>
                               )}
                            </td>
                            <td className="px-6 py-4 text-right">
                               {user.role !== 'CREATOR' && (
                                  <button 
                                    onClick={() => onBanUser(user.id)}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                                       user.isBanned 
                                       ? 'bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981]/20' 
                                       : 'bg-[#FF5B5B]/10 text-[#FF5B5B] hover:bg-[#FF5B5B]/20'
                                    }`}
                                  >
                                    {user.isBanned ? t.admin.usersList.unban : t.admin.usersList.ban}
                                  </button>
                               )}
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
              </div>
           </div>
        )}

        {activeTab === 'REPORTS' && (
           <div className="space-y-4 animate-in fade-in">
              <h3 className="font-bold text-[var(--text-main)] mb-2">{t.admin.reportsList.title}</h3>
              
              {flaggedPosts.map(post => (
                 <div key={post.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4 flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-24 h-24 bg-[var(--bg-hover)] rounded-xl shrink-0 overflow-hidden relative">
                       {post.mediaUrl ? (
                          <img src={post.mediaUrl} className="w-full h-full object-cover" alt="" />
                       ) : (
                          <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)] font-bold text-xs">TEXT</div>
                       )}
                       <div className="absolute top-1 left-1 bg-[#FF5B5B] text-white text-[10px] font-bold px-1.5 rounded-full">
                          {post.isHidden ? 'HIDDEN' : 'VISIBLE'}
                       </div>
                    </div>
                    <div className="flex-1">
                       <div className="flex items-center justify-between mb-1">
                          <span className="text-[#FF5B5B] text-xs font-bold bg-[#FF5B5B]/10 px-2 py-0.5 rounded flex items-center gap-1">
                             <AlertTriangle size={10} /> {post.flagReason || 'Generic Violation'}
                          </span>
                          <span className="text-[var(--text-muted)] text-xs">{post.timestamp}</span>
                       </div>
                       <p className="text-[var(--text-main)] text-sm line-clamp-3 mb-2 font-mono bg-[var(--bg-main)] p-2 rounded-lg">{post.content}</p>
                       <p className="text-[var(--text-muted)] text-xs">by <span className="font-bold text-[var(--text-main)]">{post.author.handle}</span></p>
                    </div>
                    <div className="flex flex-row md:flex-col gap-2 shrink-0 justify-end">
                       <button 
                         onClick={() => onBanUser(post.author.id)}
                         className="px-3 py-1.5 bg-[#FF5B5B]/10 hover:bg-[#FF5B5B]/20 text-[#FF5B5B] rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                       >
                          <Ban size={14} /> {t.admin.reportsList.banUser}
                       </button>
                       <button 
                         onClick={() => onDeletePost(post.id)}
                         className="px-3 py-1.5 bg-[var(--bg-hover)] hover:bg-[#FF5B5B]/10 hover:text-[#FF5B5B] text-[var(--text-muted)] rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                       >
                          <Trash2 size={14} /> {t.admin.reportsList.delete}
                       </button>
                       <button 
                         onClick={() => onDismissReport(post.id)}
                         className="px-3 py-1.5 bg-[var(--bg-hover)] hover:bg-[#10B981]/10 hover:text-[#10B981] text-[var(--text-muted)] rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                       >
                          <CheckCircle size={14} /> {t.admin.reportsList.keep}
                       </button>
                    </div>
                 </div>
              ))}
              {flaggedPosts.length === 0 && (
                 <div className="text-center py-10 text-[var(--text-muted)] bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] border-dashed">
                    <CheckCircle size={40} className="mx-auto mb-2 text-[#10B981]" />
                    <p>{t.admin.reportsList.empty}</p>
                 </div>
              )}
           </div>
        )}

      </div>
    </div>
  );
};

export default AdminPanel;