import React, { useState } from 'react';
import { EXERCISE_LIBRARY } from '../constants';
import { Exercise, Workout, Intensity } from '../types';
import { DynamicIcon } from './Icons';

interface WorkoutBuilderProps {
  onSave: (workout: Workout) => void;
  onCancel: () => void;
}

export const WorkoutBuilder: React.FC<WorkoutBuilderProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('My Custom Routine');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [intensity, setIntensity] = useState<Intensity>('Intermediate');

  const addExercise = (exercise: Exercise) => {
    setSelectedExercises([...selectedExercises, exercise]);
  };

  const removeExercise = (index: number) => {
    const newList = [...selectedExercises];
    newList.splice(index, 1);
    setSelectedExercises(newList);
  };

  const handleSave = () => {
    if (selectedExercises.length === 0) return;
    
    const durationMinutes = Math.ceil(selectedExercises.reduce((acc, ex) => acc + ex.defaultDuration + 30, 0) / 60);
    
    const newWorkout: Workout = {
      id: `custom-${Date.now()}`,
      title,
      description: `Custom ${selectedExercises.length} exercise routine.`,
      exercises: selectedExercises,
      estimatedCalories: durationMinutes * 8, // Rough estimate
      durationMinutes,
      category: 'Strength',
      intensity
    };
    onSave(newWorkout);
  };

  return (
    <div className="h-full flex flex-col bg-fitness-bg text-fitness-light">
      <div className="p-6 border-b border-fitness-accent/30 flex items-center justify-between sticky top-0 bg-fitness-bg z-10">
        <button onClick={onCancel} className="text-sm font-bold text-fitness-accent hover:text-white uppercase tracking-wider flex items-center gap-2">
          <DynamicIcon name="ChevronLeft" size={16} /> Back
        </button>
        <h2 className="text-xl font-bold">Build Routine</h2>
        <button 
          onClick={handleSave} 
          disabled={selectedExercises.length === 0}
          className="bg-fitness-neon text-fitness-bg px-4 py-2 rounded-full font-bold text-sm hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Save & Start
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6 grid lg:grid-cols-2 gap-8">
        
        {/* Left Column: Config & Selected */}
        <div className="space-y-6">
          <div className="bg-fitness-card p-6 rounded-2xl shadow-lg border border-white/5">
            <label className="block text-xs uppercase text-fitness-light/60 mb-2 font-bold tracking-wider">Routine Name</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-fitness-bg border border-fitness-accent/30 rounded-lg p-3 text-white focus:outline-none focus:border-fitness-neon transition-colors"
            />
            
            <div className="mt-4">
               <label className="block text-xs uppercase text-fitness-light/60 mb-2 font-bold tracking-wider">Intensity</label>
               <div className="flex gap-2">
                 {(['Beginner', 'Intermediate', 'Advanced'] as Intensity[]).map(level => (
                   <button
                    key={level}
                    onClick={() => setIntensity(level)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                      intensity === level 
                      ? 'bg-fitness-accent border-fitness-accent text-white' 
                      : 'border-fitness-accent/30 text-fitness-light/50 hover:border-fitness-accent'
                    }`}
                   >
                     {level}
                   </button>
                 ))}
               </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-fitness-neon text-fitness-bg flex items-center justify-center text-xs">{selectedExercises.length}</span>
              Your Circuit
            </h3>
            {selectedExercises.length === 0 ? (
              <div className="text-center p-8 border-2 border-dashed border-fitness-accent/20 rounded-2xl text-fitness-light/40">
                <p>No exercises selected yet.</p>
                <p className="text-sm">Tap + on exercises to add them here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedExercises.map((ex, idx) => (
                  <div key={`${ex.id}-${idx}`} className="bg-fitness-card p-4 rounded-xl flex items-start justify-between group border border-white/5 hover:border-fitness-neon/30 transition-all">
                    <div className="flex items-start gap-4">
                       {/* Larger, prominent icon container */}
                       <div className="w-14 h-14 rounded-2xl bg-fitness-bg flex-shrink-0 flex items-center justify-center text-fitness-neon shadow-inner border border-white/5">
                         <DynamicIcon name={ex.iconName} size={28} />
                       </div>
                       <div>
                         <div className="flex items-baseline gap-2">
                            <p className="font-bold text-white text-lg">{ex.name}</p>
                            <span className="text-xs font-bold text-fitness-neon bg-fitness-neon/10 px-2 py-0.5 rounded">{ex.defaultDuration}s</span>
                         </div>
                         <p className="text-sm text-fitness-light/60 mt-1 leading-relaxed">{ex.description}</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => removeExercise(idx)}
                      className="text-fitness-light/20 hover:text-red-400 p-2 transition-colors self-center"
                    >
                      <DynamicIcon name="Trash2" size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Library */}
        <div>
          <h3 className="text-lg font-bold mb-4">Exercise Library</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EXERCISE_LIBRARY.map(ex => (
              <button 
                key={ex.id}
                onClick={() => addExercise(ex)}
                className="bg-fitness-card hover:bg-fitness-accent/20 p-4 rounded-xl text-left transition-all border border-transparent hover:border-fitness-neon/30 group flex items-start justify-between"
              >
                <div className="flex gap-3">
                  <div className="mt-1 text-fitness-neon opacity-70 group-hover:opacity-100">
                    <DynamicIcon name={ex.iconName} size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">{ex.name}</p>
                    <p className="text-xs text-fitness-light/50 mt-1 line-clamp-1">{ex.description}</p>
                  </div>
                </div>
                <div className="text-fitness-neon opacity-0 group-hover:opacity-100 transition-opacity">
                  <DynamicIcon name="Plus" size={20} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};