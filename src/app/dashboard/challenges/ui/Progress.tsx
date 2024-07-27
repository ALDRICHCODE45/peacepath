"use client";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useGoalsStore } from "@/store/goals/goals.sotore";
import { getLockAndUnlockedGoals } from "@/actions/totalGoals";
import { useEffect, useState } from "react";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

export function DrawerDemo() {
  // Calculating progress towards the goal
  const [lockGoals, setLockGoals] = useState<number | null>(null);
  const [unlockGoals, setUnLockGoals] = useState<number | null>(null);

  useEffect(() => {
    const handleScore = async () => {
      const {
        ok,
        lockGoals: goals,
        unlockedGoals: goalsUnlock,
      } = await getLockAndUnlockedGoals();
      if (!ok) {
        return;
      }
      setLockGoals(goals!);
      setUnLockGoals(goalsUnlock!);
    };
    handleScore();
  }, []);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="progress">Progress</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Just one more.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {unlockGoals}/{lockGoals}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Goals/day
                </div>
              </div>
            </div>
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar
                    dataKey="goal"
                    fill="hsl(var(--foreground))"
                    opacity={0.5}
                  />
                  {/* Progress bar */}
                  <Bar
                    dataKey="goal"
                    fill="hsl(150, 70%, 50%)"
                    opacity={0.9}
                    barSize={10}
                    isAnimationActive={true}
                    animationDuration={1500}
                    animationBegin={0}
                    animationEasing="ease-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Back</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
