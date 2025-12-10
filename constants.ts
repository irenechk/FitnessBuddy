import { Exercise, Workout, Intensity } from './types';

export const EXERCISE_LIBRARY: Exercise[] = [
  // --- CARDIO / HIIT ---
  { id: 'jumping-jacks', name: 'Jumping Jacks', description: 'Full body cardio warm-up', defaultDuration: 30, iconName: 'Activity' },
  { id: 'burpees', name: 'Burpees', description: 'Full body explosive movement', defaultDuration: 30, iconName: 'ArrowUpCircle' },
  { id: 'high-knees', name: 'High Knees', description: 'Run in place lifting knees high', defaultDuration: 30, iconName: 'ChevronsUp' },
  { id: 'mountain-climbers', name: 'Mountain Climbers', description: 'Core and cardio from plank position', defaultDuration: 30, iconName: 'TrendingUp' },
  
  // --- CHEST ---
  { id: 'pushups', name: 'Standard Push-ups', description: 'Classic chest and tricep builder', defaultDuration: 30, iconName: 'ArrowDownCircle' },
  { id: 'wide-pushups', name: 'Wide Push-ups', description: 'Focuses on outer chest', defaultDuration: 30, iconName: 'ArrowDown' },
  { id: 'incline-pushups', name: 'Incline Push-ups', description: 'Upper chest focus (hands on elevated surface)', defaultDuration: 30, iconName: 'ArrowUp' },
  { id: 'decline-pushups', name: 'Decline Push-ups', description: 'Upper chest/shoulders (feet elevated)', defaultDuration: 30, iconName: 'ArrowDown' },

  // --- SHOULDERS ---
  { id: 'pike-pushups', name: 'Pike Push-ups', description: 'Vertical push for shoulders', defaultDuration: 30, iconName: 'ChevronsUp' },
  { id: 'shoulder-taps', name: 'Shoulder Taps', description: 'Plank stability and shoulder activation', defaultDuration: 30, iconName: 'Hand' },
  { id: 'arm-circles', name: 'Arm Circles', description: 'Deltoid endurance and warmup', defaultDuration: 40, iconName: 'RefreshCw' },
  { id: 'plank-walks', name: 'Lateral Plank Walks', description: 'Moving plank for shoulders', defaultDuration: 40, iconName: 'Move' },

  // --- ARMS (Triceps/Biceps) ---
  { id: 'tricep-dips', name: 'Tricep Dips', description: 'Back of arm strength using chair/floor', defaultDuration: 30, iconName: 'CornerRightDown' },
  { id: 'diamond-pushups', name: 'Diamond Push-ups', description: 'Close grip for tricep isolation', defaultDuration: 30, iconName: 'Minus' },
  { id: 'plank-ups', name: 'Plank Up-Downs', description: 'Forearm to palm transition', defaultDuration: 30, iconName: 'TrendingUp' },

  // --- BACK ---
  { id: 'supermans', name: 'Supermans', description: 'Lower back extension', defaultDuration: 30, iconName: 'UserCheck' },
  { id: 'snow-angels', name: 'Reverse Snow Angels', description: 'Upper back and scapular mobility', defaultDuration: 40, iconName: 'GitMerge' },
  { id: 'prone-y', name: 'Prone Y-Raises', description: 'Traps and shoulder health', defaultDuration: 30, iconName: 'ArrowUp' },
  { id: 'good-mornings', name: 'Bodyweight Good Mornings', description: 'Lower back and hamstring hinge', defaultDuration: 40, iconName: 'RefreshCw' },

  // --- CORE ---
  { id: 'plank', name: 'Plank', description: 'Isometric core hold', defaultDuration: 45, iconName: 'Minus' },
  { id: 'crunches', name: 'Crunches', description: 'Abdominal isolation', defaultDuration: 30, iconName: 'Circle' },
  { id: 'russian-twists', name: 'Russian Twists', description: 'Oblique rotation seated', defaultDuration: 30, iconName: 'RefreshCw' },
  { id: 'leg-raises', name: 'Leg Raises', description: 'Lower abs focus', defaultDuration: 30, iconName: 'ArrowUp' },
  { id: 'bicycle-crunches', name: 'Bicycle Crunches', description: 'Dynamic oblique and abs', defaultDuration: 40, iconName: 'Activity' },
  { id: 'flutter-kicks', name: 'Flutter Kicks', description: 'Lower ab endurance', defaultDuration: 30, iconName: 'TrendingUp' },
  { id: 'side-plank', name: 'Side Plank', description: 'Oblique isometric hold', defaultDuration: 30, iconName: 'Minus' },

  // --- LEGS ---
  { id: 'squats', name: 'Air Squats', description: 'Fundamental lower body strength', defaultDuration: 40, iconName: 'ArrowDown' },
  { id: 'lunges', name: 'Walking Lunges', description: 'Unilateral leg strength', defaultDuration: 40, iconName: 'Move' },
  { id: 'wall-sit', name: 'Wall Sit', description: 'Isometric quad hold', defaultDuration: 45, iconName: 'Square' },
  { id: 'glute-bridges', name: 'Glute Bridges', description: 'Hip extension and glutes', defaultDuration: 40, iconName: 'ArrowUpCircle' },
  { id: 'side-lunges', name: 'Side Lunges', description: 'Adductor and glute focus', defaultDuration: 40, iconName: 'Move' },
  { id: 'calf-raises', name: 'Calf Raises', description: 'Lower leg isolation', defaultDuration: 40, iconName: 'ArrowUp' },
  { id: 'reverse-lunges', name: 'Reverse Lunges', description: 'Glute focused lunge variation', defaultDuration: 40, iconName: 'ArrowDown' },
  
  // --- STRETCH ---
  { id: 'cat-cow', name: 'Cat-Cow Stretch', description: 'Spine flexibility', defaultDuration: 60, iconName: 'GitMerge' },
  { id: 'childs-pose', name: 'Child\'s Pose', description: 'Resting back stretch', defaultDuration: 60, iconName: 'User' },
];

const getExercise = (id: string): Exercise => EXERCISE_LIBRARY.find(e => e.id === id) || EXERCISE_LIBRARY[0];

// Helper to create tailored workouts
const createWorkout = (id: string, title: string, desc: string, mins: number, intensity: Intensity, cat: any, exIds: string[]): Workout => ({
  id, title, description: desc, durationMinutes: mins, intensity, category: cat,
  estimatedCalories: mins * (intensity === 'Advanced' ? 12 : intensity === 'Intermediate' ? 9 : 6),
  exercises: exIds.map(eid => getExercise(eid))
});

export const WORKOUTS_BY_LEVEL: Record<Intensity, Workout[]> = {
  'Beginner': [
    createWorkout('beg-1', 'Easy Start 10min', 'Gentle introduction to movement.', 10, 'Beginner', 'Cardio', ['jumping-jacks', 'wall-sit', 'squats', 'plank', 'jumping-jacks', 'lunges', 'cat-cow']),
    createWorkout('beg-2', 'Light Cardio 15min', 'Get the heart rate up without impact.', 15, 'Beginner', 'Cardio', ['high-knees', 'squats', 'shoulder-taps', 'crunches', 'high-knees', 'lunges', 'plank', 'childs-pose']),
    createWorkout('beg-3', 'Basic Stretch', 'Full body flexibility and relaxation.', 5, 'Beginner', 'Flexibility', ['cat-cow', 'childs-pose', 'cat-cow', 'supermans', 'childs-pose']),
    createWorkout('beg-4', 'Core Foundations', 'Building blocks for a strong core.', 12, 'Beginner', 'Strength', ['plank', 'crunches', 'leg-raises', 'plank', 'crunches', 'supermans']),
    createWorkout('beg-legs', 'Leg Starter', 'Simple lower body toning.', 15, 'Beginner', 'Strength', ['squats', 'glute-bridges', 'lunges', 'calf-raises', 'wall-sit']),
  ],
  'Intermediate': [
    createWorkout('int-1', 'HIIT 20min', 'Classic interval training to burn fat.', 20, 'Intermediate', 'HIIT', ['jumping-jacks', 'burpees', 'mountain-climbers', 'squats', 'pushups', 'high-knees', 'plank', 'burpees', 'lunges']),
    createWorkout('int-2', 'Core Strength 25min', 'Intense focus on abs and obliques.', 25, 'Intermediate', 'Strength', ['russian-twists', 'leg-raises', 'plank', 'mountain-climbers', 'crunches', 'russian-twists', 'plank']),
    createWorkout('int-3', 'Full Body 30min', 'Complete strength and conditioning.', 30, 'Intermediate', 'Strength', ['squats', 'pushups', 'lunges', 'tricep-dips', 'plank', 'burpees', 'wall-sit', 'shoulder-taps']),
    createWorkout('int-upper', 'Upper Body Pump', 'Chest, shoulders and triceps focus.', 15, 'Intermediate', 'Strength', ['pushups', 'tricep-dips', 'shoulder-taps', 'plank', 'pushups', 'diamond-pushups']),
    createWorkout('int-legs', 'Leg Power', 'Build stronger legs.', 20, 'Intermediate', 'Strength', ['squats', 'reverse-lunges', 'side-lunges', 'glute-bridges', 'squats', 'wall-sit']),
  ],
  'Advanced': [
    createWorkout('adv-1', 'Intense HIIT 30min', 'Maximum effort, minimum rest.', 30, 'Advanced', 'HIIT', ['burpees', 'mountain-climbers', 'jumping-jacks', 'burpees', 'squats', 'pushups', 'high-knees', 'plank', 'burpees']),
    createWorkout('adv-2', 'Advanced Strength 40min', 'High volume resistance training.', 40, 'Advanced', 'Strength', ['squats', 'lunges', 'pushups', 'tricep-dips', 'russian-twists', 'leg-raises', 'wall-sit', 'burpees', 'supermans']),
    createWorkout('adv-3', 'Endurance Challenge', 'Test your stamina and will.', 45, 'Advanced', 'Cardio', ['high-knees', 'mountain-climbers', 'burpees', 'jumping-jacks', 'squats', 'lunges', 'pushups', 'plank', 'burpees', 'mountain-climbers']),
    createWorkout('adv-chest', 'Chest & Tri Destroyer', 'High volume push workout.', 25, 'Advanced', 'Strength', ['wide-pushups', 'diamond-pushups', 'pike-pushups', 'tricep-dips', 'incline-pushups', 'pushups']),
    createWorkout('adv-abs', 'Abs of Steel', 'No rest core killer.', 15, 'Advanced', 'Strength', ['bicycle-crunches', 'flutter-kicks', 'plank', 'side-plank', 'leg-raises', 'russian-twists', 'mountain-climbers']),
  ]
};

// Fallback for types or generic usage
export const PREBUILT_WORKOUTS: Workout[] = [
  ...WORKOUTS_BY_LEVEL['Beginner'],
  ...WORKOUTS_BY_LEVEL['Intermediate'],
  ...WORKOUTS_BY_LEVEL['Advanced']
];