"use client";
import { DrawerDemo } from "./ui/Progress";
import { GoalCard, sleep } from "./ui/GoalCard";
import { useGoalsStore } from "@/store/goals/goals.sotore";
import { useState } from "react";
import { goalsInit, icons } from "./data/data";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Goals() {
  const setGoals = useGoalsStore((store) => store.setGoals);
  const userGoals = useGoalsStore((store) => store.goals);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateGoals = async () => {
    setIsLoading(true);
    await sleep(3);
    setGoals(goalsInit);
    setIsLoading(false);
  };

  return (
    <div className="animate__animated animate__fadeInRight text-foreground rounded-lg p-6 w-full max-w-3xl mx-auto bg-[#ffffff] dark:bg-[#181a1b]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Your Badges
        </h1>
        <DrawerDemo />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-4 overflow-y-scroll h-[calc(100vh-260px)]">
        {!userGoals.length && !isLoading && (
          <div className="w-full mx-auto flex justify-center">
            <Button
              onClick={handleCreateGoals}
              variant="default"
              className="w-[500px]"
            >
              Create challenges
            </Button>
          </div>
        )}
        {isLoading && (
          <div className="w-full mx-auto flex justify-center">
            <Loader2 width={50} height={50} className="animate-spin" />
          </div>
        )}
        {userGoals?.map((goal, index) => (
          <GoalCard
            icon={icons[index]?.icon}
            goalId={goal.id}
            state={goal.state}
            title={goal.title}
            key={goal.title}
          />
        ))}
      </div>
    </div>
  );
}
