import React, { useState, useEffect, useRef } from 'react';
import { Workout, Exercise } from '../types';
import { audioService } from '../services/audioService';
import { DynamicIcon } from './Icons';

interface WorkoutPlayerProps {
  workout: Workout;
  onComplete: (duration: number) => void;
  onExit: () => void;
}

type Phase = 'GET_READY' | 'WORK' | 'REST';

export const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({ workout, onComplete, onExit }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('GET_READY');
  const [timeLeft, setTimeLeft] = useState(5); // Start with 5s prep
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);
  const [gymMode, setGymMode] = useState(false); // New Gym Mode state

  const timerRef = useRef<number | null>(null);

  // Constants based on intensity
  const getWorkDuration = (ex: Exercise) => {
    const base = ex.defaultDuration;
    if (workout.intensity === 'Beginner') return base - 10 > 15 ? base - 10 : 15;
    if (workout.intensity === 'Advanced') return base + 15;
    return base;
  };
  
  const getRestDuration = () => {
    if (workout.intensity === 'Beginner') return 20;
    if (workout.intensity === 'Advanced') return 10;
    return 15;
  };

  const currentExercise = workout.exercises[currentExerciseIndex];
  const nextExercise = workout.exercises[currentExerciseIndex + 1];
  
  const totalExercises = workout.exercises.length;
  const progressPercent = (currentExerciseIndex / totalExercises) * 100;

  // Speak helper
  const announce = (text: string) => {
    if (soundEnabled) audioService.speak(text);
  };

  useEffect(() => {
    // Initial start
    announce(`Get ready for ${currentExercise.name}`);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        // Sound effects for countdown
        if (prev <= 4 && prev > 1 && soundEnabled) {
          audioService.playCountDown();
        }

        if (prev <= 1) {
          handlePhaseTransition();
          return 0; // Will be reset in handlePhaseTransition, but prevent negative flash
        }
        return prev - 1;
      });
      
      if (phase === 'WORK') {
        setTotalTimeElapsed(t => t + 1);
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, isPaused, currentExerciseIndex, soundEnabled]); // Re-bind on phase change

  const handlePhaseTransition = () => {
    if (phase === 'GET_READY') {
      startWork();
    } else if (phase === 'WORK') {
      if (currentExerciseIndex >= totalExercises - 1) {
        finishWorkout();
      } else {
        startRest();
      }
    } else if (phase === 'REST') {
      nextWork();
    }
  };

  const startWork = () => {
    setPhase('WORK');
    const duration = getWorkDuration(currentExercise);
    setTimeLeft(duration);
    if (soundEnabled) audioService.playStart();
    announce('Go!');
  };

  const startRest = () => {
    setPhase('REST');
    const duration = getRestDuration();
    setTimeLeft(duration);
    if (nextExercise) {
      announce(`Rest. Next up, ${nextExercise.name}`);
    }
  };

  const nextWork = () => {
    setCurrentExerciseIndex(prev => prev + 1);
    setPhase('WORK');
    // Need to get duration of the *new* exercise
    const nextEx = workout.exercises[currentExerciseIndex + 1];
    const duration = getWorkDuration(nextEx);
    setTimeLeft(duration);
    if (soundEnabled) audioService.playStart();
    announce(nextEx.name);
  };

  const finishWorkout = () => {
    if (soundEnabled) audioService.playComplete();
    announce("Workout complete! Great job.");
    onComplete(totalTimeElapsed);
  };

  const skip = () => {
    handlePhaseTransition();
  };

  const togglePause = () => setIsPaused(!isPaused);

  // Calculate progress ring
  const maxTime = phase === 'WORK' ? getWorkDuration(currentExercise) : (phase === 'REST' ? getRestDuration() : 5);
  const ringRadius = 120;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (timeLeft / maxTime) * ringCircumference;

  // Colors based on phase
  const phaseColor = phase === 'WORK' ? 'text-fitness-neon' : (phase === 'REST' ? 'text-fitness-neonBlue' : 'text-fitness-accent');
  const phaseBg = phase === 'WORK' ? 'stroke-fitness-neon' : (phase === 'REST' ? 'stroke-fitness-neonBlue' : 'stroke-fitness-accent');

  return (
    <div className={`h-full flex flex-col bg-fitness-bg relative overflow-hidden transition-all duration-500 ${gymMode ? 'bg-black' : ''}`}>
      {/* Background Gradient Mesh - Hidden in Gym Mode */}
      {!gymMode && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
           <div className={`absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl transition-colors duration-1000 ${phase === 'WORK' ? 'bg-fitness-neon' : 'bg-fitness-accent'}`}></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-fitness-neonBlue rounded-full blur-3xl opacity-50"></div>
        </div>
      )}

      {/* Header */}
      <div className="relative z-10 p-6 flex justify-between items-center">
        <button onClick={onExit} className="text-fitness-light hover:text-white transition-colors">
           <DynamicIcon name="ChevronLeft" />
        </button>
        {!gymMode && <h2 className="font-bold text-fitness-light tracking-wider uppercase text-sm">{workout.title}</h2>}
        <div className="flex gap-4">
           {/* Gym Mode Toggle */}
           <button 
             onClick={() => setGymMode(!gymMode)}
             className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${gymMode ? 'bg-fitness-neon text-fitness-bg' : 'bg-fitness-card text-fitness-light border border-white/10'}`}
           >
             <DynamicIcon name="Dumbbell" size={14} /> {gymMode ? 'Gym Mode ON' : 'Gym Mode'}
           </button>
           <button onClick={() => setSoundEnabled(!soundEnabled)} className="text-fitness-light hover:text-white transition-colors">
             <DynamicIcon name={soundEnabled ? "Volume2" : "VolumeX"} />
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
        
        <div className="mb-8 text-center min-h-[5rem]">
          {!gymMode && (
             <p className="text-fitness-light/60 text-sm font-bold tracking-widest uppercase mb-2">
               {phase === 'GET_READY' ? 'Get Ready' : (phase === 'REST' ? 'Rest' : 'Work It')}
             </p>
          )}
          <h1 className={`${gymMode ? 'text-5xl' : 'text-3xl md:text-4xl'} font-black text-white px-4 leading-tight transition-all`}>
            {phase === 'REST' ? (nextExercise ? `Next: ${nextExercise.name}` : 'Finished') : currentExercise.name}
          </h1>
        </div>

        {/* Timer Ring */}
        <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center mb-8">
           <svg className="w-full h-full transform -rotate-90">
             <circle 
               cx="50%" cy="50%" r={ringRadius} 
               className={`fill-none ${gymMode ? 'stroke-white/10' : 'stroke-fitness-card'} stroke-[12px]`}
             />
             <circle 
               cx="50%" cy="50%" r={ringRadius} 
               className={`fill-none ${phaseBg} stroke-[12px] transition-all duration-1000 ease-linear`}
               strokeDasharray={ringCircumference}
               strokeDashoffset={ringOffset}
               strokeLinecap="round"
             />
           </svg>
           <div className="absolute flex flex-col items-center">
             <span className={`text-7xl md:text-8xl font-black tabular-nums tracking-tighter ${phaseColor}`}>
               {timeLeft}
             </span>
             {!gymMode && <span className="text-fitness-light/50 text-sm uppercase font-bold tracking-widest mt-2">Seconds</span>}
           </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-8 mb-8">
           <div className="w-12"></div> {/* Spacer for centering */}
           <button 
             onClick={togglePause}
             className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-transform active:scale-95 ${phase === 'WORK' ? 'bg-fitness-neon text-fitness-bg' : 'bg-white text-fitness-bg'}`}
           >
             <DynamicIcon name={isPaused ? "Play" : "Pause"} size={32} className="fill-current" />
           </button>
           <button onClick={skip} className="w-12 h-12 rounded-full bg-fitness-card flex items-center justify-center text-white hover:bg-fitness-accent transition-colors">
             <DynamicIcon name="SkipForward" size={20} />
           </button>
        </div>
      </div>

      {/* Footer Progress - Simplified in Gym Mode */}
      <div className={`relative z-10 ${gymMode ? 'bg-black border-t border-white/10' : 'bg-fitness-card/50 backdrop-blur-md'} p-6 border-t border-white/5`}>
        <div className="flex justify-between text-xs font-bold text-fitness-light/60 mb-2 uppercase tracking-wider">
          <span>Progress</span>
          <span>{currentExerciseIndex + 1} / {totalExercises}</span>
        </div>
        <div className="h-2 bg-fitness-bg rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-fitness-accent to-fitness-neon transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        {!gymMode && (
          <div className="mt-4 flex justify-between items-center text-fitness-light/80 text-sm">
             <span className="flex items-center gap-2">
               <DynamicIcon name="Flame" size={14} className="text-fitness-neon" /> 
               {Math.round((totalTimeElapsed / 60) * 8)} kcal
             </span>
             <span className="flex items-center gap-2">
               <DynamicIcon name="Clock" size={14} className="text-fitness-neonBlue" />
               {Math.floor(totalTimeElapsed / 60)}:{(totalTimeElapsed % 60).toString().padStart(2, '0')}
             </span>
          </div>
        )}
      </div>
    </div>
  );
};