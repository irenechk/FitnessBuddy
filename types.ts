export type Intensity = 'Beginner' | 'Intermediate' | 'Advanced';

export type Goal = 'Lose Weight' | 'Build Muscle' | 'Stay Active' | 'Improve Flexibility';

export interface UserProfile {
  name: string;
  goal: Goal;
  level: Intensity;
  height: string;
  currentWeight: string;
  targetWeight: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  defaultDuration: number; // in seconds
  defaultReps?: string; // Optional string like "12 reps" for display if duration is time-based
  iconName: string;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  estimatedCalories: number;
  durationMinutes: number;
  category: 'HIIT' | 'Strength' | 'Flexibility' | 'Cardio';
  intensity: Intensity;
}

export interface WorkoutHistory {
  workoutId: string;
  date: string;
  durationSeconds: number;
  caloriesBurned: number;
}

export type ViewState = 'HOME' | 'WORKOUT_PLAYER' | 'BUILDER' | 'SUMMARY';

export type AppTab = 'DASHBOARD' | 'WORKOUTS' | 'NUTRITION' | 'HABITS' | 'SOCIAL';