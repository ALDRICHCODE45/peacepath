import { goalsInit } from "@/app/dashboard/challenges/data/data";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Goal {
  title: string;
  state: "Locked" | "Unlocked";
  icon: React.ReactNode;
  id: string;
}

interface InitialState {
  goals: Goal[];
  unlockedGoal: ({
    goalId,
    state,
  }: {
    goalId: string;
    state: "Locked" | "Unlocked";
  }) => void;
  getUnlockedQuantity: () => { totalgoals: number; unlockedGoals: number };
  setGoals: (goals: Goal[]) => void;
}

export const useGoalsStore = create<InitialState>()(
  persist(
    (set, get) => ({
      goals: goalsInit,
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
        const totalgoals = goals.length;
        const unlockedGoals = goals.filter(
          (goal) => goal.state === "Unlocked"
        ).length;
        return {
          unlockedGoals,
          totalgoals,
        };
      },
    }),
    { name: "goals" }
  )
);
