import React, { useState } from 'react';
import { UserProfile, Goal, Intensity } from '../types';
import { DynamicIcon } from './Icons';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0); // 0: Hero, 1: Name, 2: Stats, 3: Goal, 4: Level
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [goal, setGoal] = useState<Goal | null>(null);
  const [level, setLevel] = useState<Intensity | null>(null);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => Math.max(0, s - 1));

  const handleFinish = () => {
    if (name && goal && level && height && currentWeight && targetWeight) {
      onComplete({ name, goal, level, height, currentWeight, targetWeight });
    }
  };

  const renderHero = () => (
    <div className="h-full w-full overflow-y-auto bg-fitness-bg relative">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
         <img 
           src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" 
           alt="Gym Background" 
           className="w-full h-full object-cover opacity-20"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-fitness-bg via-fitness-bg/90 to-fitness-bg/50"></div>
      </div>

      <div className="min-h-full flex flex-col items-center justify-center text-center p-6 py-12 relative z-10">
         
         <div className="mb-10 relative group cursor-default">
           <div className="absolute inset-0 bg-fitness-neon blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
           <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-fitness-card to-fitness-bg border border-white/10 flex items-center justify-center shadow-2xl relative rotate-3 group-hover:rotate-6 transition-transform duration-500 ease-out">
             <DynamicIcon name="Activity" size={48} className="text-fitness-neon drop-shadow-[0_0_15px_rgba(196,249,52,0.6)]" />
           </div>
         </div>

         <div className="mb-8">
           <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-4 drop-shadow-xl">
             One day
           </h1>
           <span className="text-lg md:text-xl font-medium text-fitness-light/40 uppercase tracking-[0.5em] block my-4">
             &mdash; or &mdash;
           </span>
           <h1 className="text-5xl md:text-7xl font-black text-fitness-neon leading-[0.9] tracking-tighter drop-shadow-[0_4px_20px_rgba(196,249,52,0.3)]">
             day one.
           </h1>
         </div>
         
         <p className="text-lg md:text-xl text-fitness-light/80 font-medium tracking-wide mb-12 max-w-md leading-relaxed px-4">
           Your journey to a stronger, healthier you begins with a single decision.
         </p>
         
         <button 
           onClick={nextStep}
           className="group relative px-10 py-5 bg-fitness-neon text-fitness-bg font-black text-lg rounded-full shadow-[0_0_30px_rgba(196,249,52,0.3)] hover:shadow-[0_0_50px_rgba(196,249,52,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 w-full max-w-xs md:w-auto"
         >
           <span className="relative z-10 flex items-center justify-center gap-2">
             LET'S START <DynamicIcon name="ChevronLeft" className="rotate-180 group-hover:translate-x-1 transition-transform" />
           </span>
           <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
         </button>

         <p className="mt-12 text-[10px] text-fitness-light/20 uppercase tracking-widest font-bold">You decide.</p>
      </div>
    </div>
  );

  const renderName = () => (
    <div className="h-full w-full overflow-y-auto">
      <div className="min-h-full flex flex-col items-center justify-center p-8 max-w-lg mx-auto w-full animate-in slide-in-from-right duration-500 pb-20">
        <h2 className="text-xl font-bold text-fitness-neon mb-2 uppercase tracking-widest">Let's get personal</h2>
        <p className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">What should we call you?</p>
        
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="bg-transparent border-b-2 border-fitness-light/30 w-full text-center text-3xl md:text-4xl font-bold text-white pb-4 focus:border-fitness-neon focus:outline-none transition-colors placeholder:text-fitness-light/20"
          autoFocus
          onKeyDown={(e) => e.key === 'Enter' && name && nextStep()}
        />
        
        <button 
          onClick={nextStep}
          disabled={!name.trim()}
          className="mt-12 bg-fitness-accent text-white px-10 py-4 rounded-full font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:text-fitness-bg transition-all w-full md:w-auto"
        >
          Next Step
        </button>
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="h-full w-full overflow-y-auto">
      <div className="min-h-full flex flex-col items-center justify-center p-6 animate-in slide-in-from-right duration-500 pb-20">
        <h2 className="text-xl font-bold text-fitness-neon mb-2 uppercase tracking-widest">Your Metrics</h2>
        <p className="text-3xl font-bold text-white mb-8 text-center">Where are we starting?</p>
        
        <div className="w-full max-w-sm space-y-8">
            <div>
                <label className="block text-fitness-light/50 text-xs font-bold uppercase tracking-wider mb-2">Height</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g. 5'10&quot; or 178cm"
                    className="bg-fitness-card border border-white/10 rounded-xl px-5 py-4 w-full text-xl font-bold text-white focus:border-fitness-neon focus:outline-none transition-colors placeholder:text-fitness-light/10 pl-12"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-fitness-light/30">
                    <DynamicIcon name="ArrowUp" size={20} />
                  </div>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-fitness-light/50 text-xs font-bold uppercase tracking-wider mb-2">Current Weight</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={currentWeight}
                        onChange={(e) => setCurrentWeight(e.target.value)}
                        placeholder="e.g. 180"
                        className="bg-fitness-card border border-white/10 rounded-xl px-4 py-4 w-full text-xl font-bold text-white focus:border-fitness-neon focus:outline-none transition-colors placeholder:text-fitness-light/10"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-fitness-light/20">LBS/KG</span>
                    </div>
                </div>
                 <div>
                    <label className="block text-fitness-neon text-xs font-bold uppercase tracking-wider mb-2">Goal Weight</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={targetWeight}
                        onChange={(e) => setTargetWeight(e.target.value)}
                        placeholder="e.g. 165"
                        className="bg-fitness-card border border-fitness-neon/30 rounded-xl px-4 py-4 w-full text-xl font-bold text-fitness-neon focus:border-fitness-neon focus:outline-none transition-colors placeholder:text-fitness-neon/20 shadow-[0_0_15px_rgba(196,249,52,0.1)]"
                      />
                       <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-fitness-neon/40">LBS/KG</span>
                    </div>
                </div>
            </div>
        </div>
        
        <button 
          onClick={nextStep}
          disabled={!height || !currentWeight || !targetWeight}
          className="mt-12 bg-fitness-accent text-white px-10 py-4 rounded-full font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:text-fitness-bg transition-all w-full max-w-xs"
        >
          Next Step
        </button>
      </div>
    </div>
  );

  const renderGoal = () => {
    const goals: { id: Goal; icon: string }[] = [
      { id: 'Lose Weight', icon: 'Flame' },
      { id: 'Build Muscle', icon: 'ArrowUpCircle' },
      { id: 'Stay Active', icon: 'Activity' },
      { id: 'Improve Flexibility', icon: 'User' },
    ];

    return (
      <div className="h-full w-full overflow-y-auto">
        <div className="min-h-full flex flex-col items-center justify-center p-6 animate-in slide-in-from-right duration-500 pb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center mt-8">What's your main goal?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mb-8">
            {goals.map((g) => (
              <button
                key={g.id}
                onClick={() => setGoal(g.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${
                  goal === g.id 
                  ? 'border-fitness-neon bg-fitness-neon/10 text-white shadow-[0_0_20px_rgba(196,249,52,0.1)]' 
                  : 'border-white/10 bg-fitness-card hover:border-white/30 text-fitness-light'
                }`}
              >
                <DynamicIcon name={g.icon} size={32} className={goal === g.id ? 'text-fitness-neon' : 'opacity-50'} />
                <span className="font-bold text-sm">{g.id}</span>
              </button>
            ))}
          </div>

          <button 
            onClick={nextStep}
            disabled={!goal}
            className="bg-fitness-accent text-white px-10 py-4 rounded-full font-bold disabled:opacity-30 transition-all hover:bg-white hover:text-fitness-bg w-full max-w-xs"
          >
            Next Step
          </button>
        </div>
      </div>
    );
  };

  const renderLevel = () => {
    const levels: { id: Intensity; desc: string }[] = [
      { id: 'Beginner', desc: 'I am just starting my fitness journey.' },
      { id: 'Intermediate', desc: 'I workout regularly but want to improve.' },
      { id: 'Advanced', desc: 'I am ready to be pushed to the limit.' },
    ];

    return (
      <div className="h-full w-full overflow-y-auto">
        <div className="min-h-full flex flex-col items-center justify-center p-6 animate-in slide-in-from-right duration-500 pb-20">
          <h2 className="text-3xl font-bold text-white mb-2 text-center mt-8">Experience Level</h2>
          <p className="text-fitness-light/60 mb-8 text-center">We'll tailor the workouts to you.</p>
          
          <div className="flex flex-col gap-4 w-full max-w-md mb-8">
            {levels.map((l) => (
              <button
                key={l.id}
                onClick={() => setLevel(l.id)}
                className={`p-5 rounded-xl border-2 transition-all duration-300 text-left relative overflow-hidden group ${
                  level === l.id 
                  ? 'border-fitness-neon bg-fitness-card shadow-[0_0_15px_rgba(196,249,52,0.1)]' 
                  : 'border-white/5 bg-fitness-card/50 hover:bg-fitness-card hover:border-white/20'
                }`}
              >
                <div className={`absolute top-0 left-0 w-1 h-full transition-colors duration-300 ${level === l.id ? 'bg-fitness-neon' : 'bg-transparent'}`}></div>
                <h3 className={`font-bold text-lg ${level === l.id ? 'text-white' : 'text-fitness-light group-hover:text-white'}`}>{l.id}</h3>
                <p className="text-sm text-fitness-light/50">{l.desc}</p>
              </button>
            ))}
          </div>

          <button 
            onClick={handleFinish}
            disabled={!level}
            className="bg-fitness-neon text-fitness-bg px-12 py-4 rounded-full font-bold text-lg disabled:opacity-30 hover:scale-105 transition-all shadow-lg shadow-fitness-neon/20 w-full max-w-xs"
          >
            Create My Plan
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full bg-fitness-bg relative overflow-hidden">
      {/* Background Ambience - Global */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
         {step > 0 && (
           <>
             <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] bg-fitness-neon/5 rounded-full blur-[100px] opacity-50"></div>
             <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/40 to-transparent"></div>
           </>
         )}
      </div>

      {/* Progress Bar (hidden on hero) */}
      {step > 0 && (
        <div className="absolute top-0 left-0 w-full h-2 bg-fitness-card z-20">
          <div 
            className="h-full bg-fitness-neon transition-all duration-500 ease-out shadow-[0_0_10px_rgba(196,249,52,0.5)]"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      )}

      {/* Navigation Back */}
      {step > 0 && (
        <button 
          onClick={prevStep}
          className="absolute top-6 left-6 z-20 text-fitness-light/50 hover:text-white transition-colors bg-black/20 p-2 rounded-full backdrop-blur-sm"
        >
          <DynamicIcon name="ChevronLeft" size={24} />
        </button>
      )}

      <div className="relative z-10 h-full">
        {step === 0 && renderHero()}
        {step === 1 && renderName()}
        {step === 2 && renderStats()}
        {step === 3 && renderGoal()}
        {step === 4 && renderLevel()}
      </div>
    </div>
  );
};