"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import React from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  state: string;
  icon: React.ReactNode;
}

export const GoalCard = ({ icon, state, title }: Props) => {
  const handleClick = () => {
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
  };
  return (
    <>
      <Card className="relative dark:bg-[#181a1b] rounded-lg p-4 flex flex-col items-center justify-center border dark:border-[#363b3d]">
        <Button
          onClick={handleClick}
          className="absolute top-2 right-2 "
          variant="outline"
        >
          Compleat
        </Button>
        <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mb-2 border border-[#363b3d]">
          {icon}
        </div>
        <div className="flex flex-col items-center justify-between ">
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
    </>
  );
};
