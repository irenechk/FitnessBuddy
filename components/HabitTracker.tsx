import React, { useState } from 'react';
import { DynamicIcon } from './Icons';

interface Habit {
  id: string;
  name: string;
  icon: string;
  completed: boolean;
  streak: number;
}

export const HabitTracker = () => {
  const [waterCount, setWaterCount] = useState(3);
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', name: 'Morning Checklist', icon: 'CheckCircle', completed: true, streak: 12 },
    { id: '2', name: 'No Sugar', icon: 'Minus', completed: false, streak: 5 },
    { id: '3', name: '8h Sleep', icon: 'Moon', completed: false, streak: 8 },
    { id: '4', name: 'Read 10 Pages', icon: 'Spectacles', completed: true, streak: 21 },
  ]);

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  return (
    <div className="h-full overflow-y-auto p-6 animate-in fade-in pb-24">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h2 className="text-2xl font-black text-white">Daily Habits</h2>
           <p className="text-fitness-light/60 text-sm">Consistency is key.</p>
        </div>
        <div className="bg-fitness-card border border-fitness-neon/20 px-4 py-2 rounded-full flex items-center gap-2">
           <DynamicIcon name="Flame" className="text-fitness-neon" size={18} />
           <span className="font-black text-white">12 Day Streak</span>
        </div>
      </div>

      {/* Water Tracker */}
      <div className="bg-gradient-to-br from-blue-900/40 to-fitness-card p-6 rounded-3xl border border-blue-500/20 mb-6 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-6 opacity-10">
           <DynamicIcon name="Droplet" size={80} />
         </div>
         <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 relative z-10">
           <DynamicIcon name="Droplet" className="text-blue-400" /> Hydration
         </h3>
         <div className="flex items-center justify-between relative z-10">
            <div className="flex gap-1">
               {[...Array(8)].map((_, i) => (
                 <div 
                   key={i} 
                   className={`w-3 h-8 rounded-full transition-all ${i < waterCount ? 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]' : 'bg-fitness-bg/50'}`}
                 ></div>
               ))}
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setWaterCount(Math.max(0, waterCount - 1))}
                className="w-8 h-8 rounded-full bg-fitness-bg flex items-center justify-center hover:bg-fitness-light/10 text-white transition-colors"
              >
                <DynamicIcon name="Minus" size={16} />
              </button>
              <span className="font-black text-2xl text-white">{waterCount * 250}<span className="text-xs font-normal text-fitness-light/50 ml-1">ml</span></span>
              <button 
                onClick={() => setWaterCount(Math.min(8, waterCount + 1))}
                className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-400 text-white shadow-lg transition-colors"
              >
                <DynamicIcon name="Plus" size={16} />
              </button>
            </div>
         </div>
      </div>

      {/* Habit List */}
      <div className="space-y-3">
         {habits.map(habit => (
           <div 
             key={habit.id}
             onClick={() => toggleHabit(habit.id)}
             className={`p-4 rounded-2xl flex items-center justify-between cursor-pointer border transition-all ${
               habit.completed 
               ? 'bg-fitness-neon/10 border-fitness-neon/30' 
               : 'bg-fitness-card border-white/5 hover:border-white/10'
             }`}
           >
              <div className="flex items-center gap-4">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${habit.completed ? 'bg-fitness-neon text-fitness-bg' : 'bg-fitness-bg text-fitness-light/30'}`}>
                    <DynamicIcon name={habit.icon} size={24} />
                 </div>
                 <div>
                    <h4 className={`font-bold text-lg ${habit.completed ? 'text-white' : 'text-fitness-light/70'}`}>{habit.name}</h4>
                    <p className="text-xs font-bold text-fitness-light/30 uppercase tracking-wider">{habit.streak} Day Streak</p>
                 </div>
              </div>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${habit.completed ? 'bg-fitness-neon border-fitness-neon' : 'border-fitness-light/20'}`}>
                 {habit.completed && <DynamicIcon name="CheckCircle" size={16} className="text-fitness-bg" />}
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};