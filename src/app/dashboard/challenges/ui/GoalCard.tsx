"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { useGoalsStore } from "@/store/goals/goals.sotore";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  title: string;
  state: GoalState;
  icon: React.ReactNode;
  goalId: string;
}

const sleep = (s: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, s * 1000);
  });
};

export const GoalCard = ({ icon, state, title, goalId }: Props) => {
  const unlockedGoal = useGoalsStore((state) => state.unlockedGoal);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleClick = async () => {
    setIsLoading(true);
    await sleep(4);
    toast({
      variant: "default",
      title: "Congrats!!, Goal Unlocked",
      description: "You can do it!",
    });
    unlockedGoal({ goalId: goalId, state: GoalState.Unlocked });
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    setIsLoading(false);
  };

  return (
    <Card className="p-4 flex flex-col items-center text-center">
      <Badge
        className={`text-primary-foreground ${
          state === GoalState.Unlocked ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {state}
      </Badge>
      <div className="my-4">{icon}</div>
      <h2 className="font-bold text-lg">{title}</h2>
      {state === GoalState.Locked && (
        <Button
          className="mt-4"
          onClick={handleClick}
          disabled={isLoading}
          size="sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait...
            </>
          ) : (
            "Unlock"
          )}
        </Button>
      )}
    </Card>
  );
};
