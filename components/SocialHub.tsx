import React from 'react';
import { DynamicIcon } from './Icons';

export const SocialHub = () => {
  const friends = [
    { id: 1, name: 'Omkar', points: 2450, active: true, rank: 1, avatar: 'OM' },
    { id: 2, name: 'Harsh', points: 2100, active: true, rank: 2, avatar: 'HA' },
    { id: 3, name: 'Shrvan', points: 1850, active: false, rank: 3, avatar: 'SH' },
    { id: 4, name: 'Sarthak', points: 1200, active: false, rank: 4, avatar: 'SA' },
  ];

  return (
    <div className="h-full overflow-y-auto p-6 animate-in fade-in pb-24">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-white">Community</h2>
        <button className="text-fitness-neon text-sm font-bold uppercase tracking-wider flex items-center gap-2">
          <DynamicIcon name="Share2" size={16} /> Invite
        </button>
      </div>

      {/* Active Challenge */}
      <div className="bg-gradient-to-r from-fitness-card to-fitness-bg border border-fitness-neon/20 p-6 rounded-3xl mb-8 relative overflow-hidden">
         <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
            <DynamicIcon name="Trophy" size={150} />
         </div>
         <span className="inline-block px-2 py-1 bg-fitness-neon text-fitness-bg text-[10px] font-black uppercase tracking-widest rounded mb-2">Weekly Challenge</span>
         <h3 className="text-xl font-black text-white mb-1">Total Workout Volume</h3>
         <p className="text-fitness-light/60 text-sm mb-4">Ends in 2 days</p>
         
         <div className="w-full bg-fitness-bg/50 h-3 rounded-full overflow-hidden mb-2">
            <div className="bg-fitness-neon h-full w-3/4 rounded-full relative">
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
            </div>
         </div>
         <p className="text-right text-xs font-bold text-fitness-neon">Omkar is leading!</p>
      </div>

      {/* Leaderboard */}
      <h3 className="font-bold text-fitness-light/50 uppercase tracking-widest text-xs mb-4">Leaderboard</h3>
      <div className="space-y-4">
        {friends.map((friend) => (
          <div key={friend.id} className={`flex items-center justify-between p-4 rounded-2xl border ${friend.rank === 1 ? 'bg-fitness-accent/10 border-fitness-neon/30' : 'bg-fitness-card border-white/5'}`}>
             <div className="flex items-center gap-4">
                <div className="font-black text-fitness-light/30 w-6 text-center text-lg">{friend.rank}</div>
                <div className="relative">
                   <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${friend.rank === 1 ? 'bg-fitness-neon text-fitness-bg' : 'bg-fitness-bg text-fitness-light border border-white/10'}`}>
                      {friend.avatar}
                   </div>
                   {friend.active && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-fitness-card rounded-full"></div>}
                </div>
                <div>
                   <p className={`font-bold ${friend.rank === 1 ? 'text-fitness-neon' : 'text-white'}`}>{friend.name}</p>
                   <p className="text-xs text-fitness-light/50">{friend.points} XP</p>
                </div>
             </div>
             {friend.rank <= 3 && (
                <DynamicIcon name="Trophy" size={20} className={friend.rank === 1 ? 'text-yellow-400' : (friend.rank === 2 ? 'text-gray-400' : 'text-orange-400')} />
             )}
          </div>
        ))}
      </div>
    </div>
  );
};