import React, { useState, useEffect } from 'react';
import { Workout, WorkoutHistory, ViewState, Intensity, UserProfile, AppTab } from './types';
import { WORKOUTS_BY_LEVEL, PREBUILT_WORKOUTS } from './constants';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { WorkoutBuilder } from './components/WorkoutBuilder';
import { Onboarding } from './components/Onboarding';
import { DynamicIcon } from './components/Icons';
import { NutritionScanner } from './components/NutritionScanner';
import { HabitTracker } from './components/HabitTracker';
import { SocialHub } from './components/SocialHub';

function App() {
  const [view, setView] = useState<ViewState>('HOME');
  const [currentTab, setCurrentTab] = useState<AppTab>('DASHBOARD');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  // State for workouts
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [customWorkouts, setCustomWorkouts] = useState<Workout[]>([]);
  const [history, setHistory] = useState<WorkoutHistory[]>([]);
  
  const [lastWorkoutStats, setLastWorkoutStats] = useState<{time: number, cals: number} | null>(null);

  // Load basic mock history & profile simulation
  useEffect(() => {
    // Simulating local storage load
    const mockHistory: WorkoutHistory[] = [
      { workoutId: '7-min', date: new Date(Date.now() - 86400000).toISOString(), durationSeconds: 420, caloriesBurned: 150 },
      { workoutId: 'hiit-1', date: new Date(Date.now() - 172800000).toISOString(), durationSeconds: 600, caloriesBurned: 220 },
      { workoutId: 'yoga', date: new Date(Date.now() - 259200000).toISOString(), durationSeconds: 900, caloriesBurned: 180 },
    ];
    setHistory(mockHistory);
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const handleStartWorkout = (workout: Workout) => {
    // Clone workout to apply intensity globally if not custom
    const workoutToStart = { ...workout, intensity: userProfile?.level || 'Intermediate' };
    setActiveWorkout(workoutToStart);
    setView('WORKOUT_PLAYER');
  };

  const handleWorkoutComplete = (durationSeconds: number) => {
    if (!activeWorkout) return;
    
    // Simple cal calc
    const multiplier = activeWorkout.intensity === 'Advanced' ? 12 : (activeWorkout.intensity === 'Beginner' ? 6 : 9);
    const cals = Math.floor((durationSeconds / 60) * multiplier);

    const newEntry: WorkoutHistory = {
      workoutId: activeWorkout.id,
      date: new Date().toISOString(),
      durationSeconds,
      caloriesBurned: cals
    };

    setHistory([newEntry, ...history]);
    setLastWorkoutStats({ time: durationSeconds, cals });
    setView('SUMMARY');
  };

  const handleSaveCustom = (workout: Workout) => {
    setCustomWorkouts([...customWorkouts, workout]);
    handleStartWorkout(workout);
  };

  // Weekly Stats
  const thisWeekHistory = history.filter(h => {
    const d = new Date(h.date);
    const now = new Date();
    return (now.getTime() - d.getTime()) < 7 * 24 * 60 * 60 * 1000;
  });
  const totalMinutes = Math.floor(thisWeekHistory.reduce((acc, curr) => acc + curr.durationSeconds, 0) / 60);
  const workoutsCount = thisWeekHistory.length;

  // Filter workouts based on profile level
  const displayedWorkouts = userProfile 
    ? [...customWorkouts, ...WORKOUTS_BY_LEVEL[userProfile.level]] 
    : PREBUILT_WORKOUTS;

  const renderDashboard = () => (
    <div className="h-full overflow-y-auto pb-32 animate-in fade-in duration-700 p-6 pt-12">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-1">
              Hi, <span className="text-fitness-neon capitalize">{userProfile?.name}</span>
            </h1>
            <p className="text-fitness-light/70 text-sm italic">"One day or day one."</p>
          </div>
          <div className="flex flex-col items-end">
             <div className="w-10 h-10 rounded-full bg-fitness-card border border-fitness-neon/30 text-fitness-neon flex items-center justify-center font-bold mb-1 shadow-[0_0_10px_rgba(196,249,52,0.2)]">
               {userProfile?.name.charAt(0).toUpperCase()}
             </div>
          </div>
        </div>

        {/* Goal Card */}
        <div className="bg-gradient-to-r from-fitness-card to-fitness-bg p-4 rounded-xl border border-white/5 mb-6 flex items-center justify-between shadow-lg relative overflow-hidden">
           <div className="absolute right-[-20px] bottom-[-20px] text-fitness-neon/5 rotate-12">
              <DynamicIcon name="TrendingUp" size={100} />
           </div>
           <div className="flex items-center gap-4 relative z-10">
              <div className="bg-fitness-neon/10 p-3 rounded-xl text-fitness-neon border border-fitness-neon/20">
                <DynamicIcon name="TrendingUp" size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-fitness-light/50 tracking-wider">Current Goal</p>
                <p className="font-black text-white text-lg leading-tight">{userProfile?.goal}</p>
              </div>
           </div>
        </div>

        {/* Enhanced Activity Volume Graph */}
        <div className="bg-fitness-card p-6 rounded-3xl shadow-xl border border-white/5 mb-6 relative overflow-hidden">
           {/* Header */}
           <div className="flex justify-between items-start mb-6">
             <div>
               <h3 className="text-lg font-black text-white">Activity Volume</h3>
               <p className="text-fitness-light/50 text-xs">Minutes per day</p>
             </div>
             <div className="text-right">
               <p className="text-2xl font-black text-fitness-neon">+12%</p>
               <p className="text-[10px] uppercase font-bold text-fitness-light/30 tracking-wider">vs Last Week</p>
             </div>
           </div>

           {/* Chart */}
           <div className="h-40 w-full flex items-end justify-between gap-2 relative">
             {/* Grid lines */}
             <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="w-full h-px bg-white/10 border-t border-dashed border-white/20"></div>
                <div className="w-full h-px bg-white/10 border-t border-dashed border-white/20"></div>
                <div className="w-full h-px bg-white/10 border-t border-dashed border-white/20"></div>
                <div className="w-full h-px bg-white/10 border-t border-dashed border-white/20"></div>
             </div>

             {/* Bars */}
             {[
               { day: 'M', val: 30, label: '30m' },
               { day: 'T', val: 45, label: '45m' },
               { day: 'W', val: 25, label: '25m' },
               { day: 'T', val: 60, label: '1h' },
               { day: 'F', val: 40, label: '40m' },
               { day: 'S', val: 85, label: '1h 25m' }, // Peak
               { day: 'S', val: 50, label: '50m' },
             ].map((d, i) => (
               <div key={i} className="flex-1 h-full flex flex-col justify-end group relative z-10 cursor-pointer">
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-fitness-bg border border-white/10 text-white text-[10px] font-bold py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none shadow-xl z-20">
                    {d.label}
                    <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-fitness-bg border-r border-b border-white/10 rotate-45"></div>
                  </div>
                  
                  {/* Bar */}
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-500 relative overflow-hidden group-hover:brightness-110 ${i === 5 ? 'bg-fitness-neon shadow-[0_0_20px_rgba(196,249,52,0.3)]' : 'bg-fitness-card border border-white/10 bg-gradient-to-t from-white/5 to-white/10'}`} 
                    style={{ height: `${d.val}%` }}
                  >
                     {/* Inner Gradient for sheen */}
                     <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  {/* Label */}
                  <p className={`text-center mt-3 text-[10px] font-bold transition-colors ${i === 5 ? 'text-fitness-neon' : 'text-fitness-light/30 group-hover:text-white'}`}>{d.day}</p>
               </div>
             ))}
           </div>
        </div>

        {/* Weekly Stats Row */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-fitness-card p-4 rounded-xl border border-white/5">
             <div className="flex items-center gap-2 mb-2 text-fitness-light/50">
               <DynamicIcon name="Activity" size={16} /> <span className="text-[10px] font-bold uppercase tracking-wider">Workouts</span>
             </div>
             <p className="text-2xl font-black text-white">{workoutsCount}</p>
           </div>
           <div className="bg-fitness-card p-4 rounded-xl border border-white/5">
             <div className="flex items-center gap-2 mb-2 text-fitness-light/50">
               <DynamicIcon name="Clock" size={16} /> <span className="text-[10px] font-bold uppercase tracking-wider">Minutes</span>
             </div>
             <p className="text-2xl font-black text-fitness-neon">{totalMinutes}</p>
           </div>
        </div>
    </div>
  );

  const renderWorkouts = () => (
    <div className="h-full overflow-y-auto pb-32 animate-in fade-in duration-700 p-6 pt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-white">Workouts</h2>
          <button onClick={() => setView('BUILDER')} className="text-fitness-neon text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:brightness-110">
             <DynamicIcon name="Plus" size={14} /> Custom
          </button>
        </div>

        <div className="grid gap-4 mb-8">
          {displayedWorkouts.map((workout, idx) => (
            <div 
              key={workout.id}
              onClick={() => handleStartWorkout(workout)}
              className="bg-fitness-card rounded-2xl p-5 relative overflow-hidden group cursor-pointer border border-white/5 hover:border-fitness-neon/30 transition-all active:scale-[0.98]"
            >
              <div className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity ${idx % 2 === 0 ? 'bg-fitness-neon' : 'bg-fitness-neonBlue'}`}></div>
              <div className="relative z-10 flex justify-between items-start">
                 <div>
                   <span className={`inline-block px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest mb-2 ${idx % 2 === 0 ? 'bg-fitness-neon text-fitness-bg' : 'bg-fitness-neonBlue text-fitness-bg'}`}>
                     {workout.category}
                   </span>
                   <h4 className="text-xl font-bold text-white mb-1">{workout.title}</h4>
                   <p className="text-xs text-fitness-light/60 line-clamp-1 max-w-[200px]">{workout.description}</p>
                 </div>
                 <div className="bg-fitness-bg/50 backdrop-blur-sm p-2 rounded-full">
                    <DynamicIcon name="Play" size={20} className="text-white fill-white pl-1" />
                 </div>
              </div>

              <div className="relative z-10 flex items-center gap-4 mt-6 text-xs text-fitness-light/50 font-medium">
                 <span className="flex items-center gap-1">
                   <DynamicIcon name="Clock" size={12} /> {workout.durationMinutes} min
                 </span>
                 <span className="flex items-center gap-1">
                   <DynamicIcon name="Flame" size={12} /> ~{workout.estimatedCalories} cal
                 </span>
              </div>
            </div>
          ))}
        </div>
    </div>
  );

  const renderSummary = () => (
    <div className="h-full flex flex-col bg-fitness-bg relative overflow-y-auto">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none fixed">
        <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-fitness-accent/10 to-transparent"></div>
      </div>

      <div className="relative z-10 p-8 pb-32 max-w-2xl mx-auto w-full">
        {/* Celebration Header */}
        <div className="text-center mb-10 animate-in slide-in-from-top duration-700">
          <div className="w-20 h-20 bg-fitness-neon text-fitness-bg rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(196,249,52,0.4)] animate-pulse-slow">
            <DynamicIcon name="CheckCircle" size={40} />
          </div>
          <h2 className="text-4xl font-black text-white mb-2 uppercase italic tracking-tight">Crushed It!</h2>
          <p className="text-fitness-light/60">Another workout in the books.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-10 animate-in slide-in-from-bottom duration-700 delay-100">
           <div className="bg-fitness-card/50 backdrop-blur-sm p-5 rounded-2xl border border-white/5 flex flex-col items-center">
             <p className="text-3xl font-black text-fitness-neonBlue">{lastWorkoutStats?.time ? Math.floor(lastWorkoutStats.time / 60) : 0}<span className="text-sm font-normal text-fitness-light/40 ml-1">m</span></p>
             <p className="text-[10px] uppercase font-bold text-fitness-light/40 mt-1 tracking-widest">Duration</p>
           </div>
           <div className="bg-fitness-card/50 backdrop-blur-sm p-5 rounded-2xl border border-white/5 flex flex-col items-center">
             <p className="text-3xl font-black text-fitness-neon">{lastWorkoutStats?.cals || 0}</p>
             <p className="text-[10px] uppercase font-bold text-fitness-light/40 mt-1 tracking-widest">Calories</p>
           </div>
        </div>

        <button 
          onClick={() => { setView('HOME'); setCurrentTab('DASHBOARD'); }}
          className="w-full bg-fitness-accent hover:bg-white hover:text-fitness-bg text-white font-bold py-4 rounded-full transition-all duration-300 shadow-xl mb-4"
        >
          BACK TO DASHBOARD
        </button>
      </div>
    </div>
  );

  const BottomNav = () => (
    <div className="absolute bottom-6 left-6 right-6 h-16 bg-fitness-card/90 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-between px-6 shadow-2xl z-50">
       {[
         { id: 'DASHBOARD', icon: 'Home' },
         { id: 'WORKOUTS', icon: 'Dumbbell' },
         { id: 'NUTRITION', icon: 'Utensils' },
         { id: 'HABITS', icon: 'CheckCircle' },
         { id: 'SOCIAL', icon: 'Users' }
       ].map((tab) => (
         <button 
           key={tab.id}
           onClick={() => setCurrentTab(tab.id as AppTab)}
           className={`p-2 rounded-full transition-all ${currentTab === tab.id ? 'bg-fitness-neon text-fitness-bg scale-110 shadow-[0_0_15px_rgba(196,249,52,0.4)]' : 'text-fitness-light/50 hover:text-white'}`}
         >
           <DynamicIcon name={tab.icon} size={20} />
         </button>
       ))}
    </div>
  );

  if (!userProfile) {
    return (
      <div className="h-screen w-full bg-fitness-bg text-fitness-light overflow-hidden font-sans">
        <Onboarding onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-fitness-bg text-fitness-light overflow-hidden font-sans selection:bg-fitness-neon selection:text-fitness-bg relative">
      {view === 'HOME' && (
        <>
          <div className="h-full pb-24">
            {currentTab === 'DASHBOARD' && renderDashboard()}
            {currentTab === 'WORKOUTS' && renderWorkouts()}
            {currentTab === 'NUTRITION' && <NutritionScanner />}
            {currentTab === 'HABITS' && <HabitTracker />}
            {currentTab === 'SOCIAL' && <SocialHub />}
          </div>
          <BottomNav />
        </>
      )}

      {view === 'WORKOUT_PLAYER' && activeWorkout && (
        <WorkoutPlayer 
          workout={activeWorkout} 
          onComplete={handleWorkoutComplete}
          onExit={() => setView('HOME')}
        />
      )}
      {view === 'BUILDER' && (
        <WorkoutBuilder 
          onSave={handleSaveCustom}
          onCancel={() => setView('HOME')}
        />
      )}
      {view === 'SUMMARY' && renderSummary()}
    </div>
  );
}

export default App;