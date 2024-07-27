"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { unlockGoal } from "@/actions/unlockedChallenge";
import { ShowDetails } from "./AlertDetails";

interface Props {
  title: string;
  state: "Unlocked" | "Locked";
  icon: React.ReactNode;
  goalId: string;
  description: string;
}

export const sleep = (s: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, s * 1000);
  });
};

export const GoalCard = ({
  icon,
  state,
  title,
  goalId,
  description,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleClick = async () => {
    setIsLoading(true);
    await sleep(2);
    toast({
      variant: "default",
      title: "¡Felicidades!, Meta Desbloqueada",
      description: "¡Puedes hacerlo!",
    });
    await unlockGoal(goalId);
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
    <Card className="animate__animated animate__fadeInDown relative dark:bg-[#181a1b] rounded-lg p-4 flex flex-col items-center justify-between border dark:border-[#363b3d] w-full h-full  mb-5">
      <div className="w-full flex justify-between items-center">
        <ShowDetails details={description} />
        <Button
          onClick={handleClick}
          disabled={state === "Unlocked"}
          variant="outline"
          className="ml-2"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Complete"}
        </Button>
      </div>
      <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center border border-[#363b3d]">
        {icon}
      </div>
      <div className="flex flex-col items-center">
        <p className="text-sm font-medium text-black dark:text-white">
          {title}
        </p>
        <Badge
          variant={state === "Unlocked" ? "success_badged" : "outline"}
          className="text-black border dark:border-[#363b3d] mt-2"
        >
          {state}
        </Badge>
      </div>
    </Card>
  );
};
