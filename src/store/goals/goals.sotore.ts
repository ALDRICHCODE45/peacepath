import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Goal {
  title: string;
  state: GoalState;
  id: string;
}

export enum GoalState {
  Unlocked = "Unlocked",
  Locked = "Locked",
}

interface InitialState {
  goals: Goal[];
  unlockedGoal: (goal: { goalId: string; state: GoalState }) => void;
  getUnlockedQuantity: () => { totalGoals: number; unlockedGoals: number };
  setGoals: (goals: Goal[]) => void;
}

export const useGoalsStore = create<InitialState>()(
  persist(
    (set, get) => ({
      goals: [],
      setGoals(newGoals: Goal[]) {
        set({ goals: newGoals });
      },
      unlockedGoal({ goalId, state }) {
        const { goals } = get();
        const updatedGoals = goals.map((goal) => {
          if (goal.id === goalId) {
            if (goal.state === state) return goal;
            return { ...goal, state: state };
          }
          return goal;
        });
        set({ goals: updatedGoals });
      },
      getUnlockedQuantity() {
        const { goals } = get();
        const totalGoals = goals.length;
        const unlockedGoals = goals.filter(
          (goal) => goal.state === GoalState.Unlocked
        ).length;
        return {
          totalGoals,
          unlockedGoals,
        };
      },
    }),
    { name: "goals" }
  )
);
