# YourFitnessBuddy

A premium, intelligent fitness companion designed to help you build muscle, lose weight, and stay consistent. YourFitnessBuddy combines structured workout timers, AI-powered nutrition analysis, and social gamification into a sleek, dark-mode experience.

## 🚀 Features

### 🏋️ Workouts
- **Smart Workout Player**: Voice-guided interval timer with "Get Ready", "Work", and "Rest" phases.
- **Gym Mode**: A simplified, high-contrast black interface optimized for OLED screens and battery life during intense sessions.
- **Pre-built Routines**: Curated workouts for Beginner, Intermediate, and Advanced levels (HIIT, Strength, Cardio, Flexibility).
- **Custom Builder**: Create your own circuits from a comprehensive library of exercises.

### 🍎 AI Nutrition Scanner
- **Snap & Analyze**: Take a picture of your meal.
- **Powered by Gemini**: Uses Google's Gemini 2.5 Flash model to instantly estimate calories, protein, carbs, fats, and provide a health score.
- **Smart Tips**: Get quick, actionable dietary advice based on your specific meal.

### 📊 Progress & Habits
- **Dashboard**: Track your weekly activity volume and workout consistency.
- **Habit Tracker**: Monitor daily wellness goals like sleep, reading, and sugar intake.
- **Hydration Log**: Interactive water tracker.

### 🏆 Social Hub
- **Leaderboards**: Compete with friends for XP.
- **Challenges**: Participate in weekly community fitness challenges.

## 🛠️ Tech Stack

- **Frontend**: React 19
- **Styling**: Tailwind CSS
- **AI**: Google GenAI SDK (`@google/genai`)
- **Icons**: Lucide React

## ⚙️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/your-fitness-buddy.git
   cd your-fitness-buddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   This app requires a Google Gemini API key for the Nutrition Scanner features.
   - Ensure the `API_KEY` environment variable is accessible in your runtime environment.

4. **Run the app**
   ```bash
   npm start
   ```

## 🎨 Design System

The app features a custom "Warm Carbon" theme designed for visual comfort in low-light environments (gyms, evening workouts).

- **Background**: Deep Warm Carbon (`#262522`)
- **Accents**: Neon Cream (`#F2E2B1`) & Olive Gold (`#BDB395`)
- **Typography**: Inter (Google Fonts)

## 📱 Mobile First
Designed with a mobile-first approach, ensuring a native-app-like feel on all devices.