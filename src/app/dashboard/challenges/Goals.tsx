"use client";

import { DrawerDemo } from "./ui/Progress";
import { GoalCard, sleep } from "./ui/GoalCard";
import { GoalState, useGoalsStore } from "@/store/goals/goals.sotore";
import { useEffect, useState } from "react";
import { goalsInit, icons } from "./data/data";
import { Button } from "@/components/ui/button";
import { Loader2, Medal } from "lucide-react";
import { Challenge } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { crateNewChallenge } from "@/actions/createNewChallenge";

interface Goal {
  id: string;
  title: string;
  description: string;
  State: "Unlocked" | "Locked";
}

interface Props {
  initialGoals: Challenge[];
}
export default function Goals({ initialGoals }: Props) {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error,
      });
    }
  }, [error]);

  const handleCreateGoals = async () => {
    setIsLoading(true);
    await sleep(4);
    await crateNewChallenge();
    setIsLoading(false);
  };
  return (
    <div className="animate__animated animate__fadeInRight text-foreground rounded-lg p-6 w-full max-w-3xl mx-auto bg-[#ffffff] dark:bg-[#181a1b]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Your Badges
        </h1>
        <DrawerDemo />
        <div className="w-full mx-auto flex justify-center">
          <Button
            onClick={handleCreateGoals}
            variant="default"
            className="w-[500px]"
            disabled={loading}
          >
            Create new Challenge
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-4 overflow-y-scroll h-[calc(100vh-260px)]">
        {loading && (
          <div className="w-full mx-auto flex justify-center">
            <Loader2 width={50} height={50} className="animate-spin" />
          </div>
        )}
        {initialGoals?.map((goal) => (
          <GoalCard
            icon={<Medal className="w-8 h-8 text-primary-foreground" />}
            goalId={goal.id}
            state={goal.State}
            title={goal.title}
            key={goal.title}
          />
        ))}
      </div>
    </div>
  );
}
