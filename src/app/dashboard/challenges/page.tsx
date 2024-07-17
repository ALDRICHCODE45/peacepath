import { DrawerDemo } from "./ui/Progress";
import {
  Medal,
  NotebookTabs,
  PersonStanding,
  Smile,
  Trophy,
} from "lucide-react";
import { GoalCard } from "./ui/GoalCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peace Path - Goals and good habits",
};

export default function Component() {
  const goals = [
    {
      title: "Positive Mindset",
      state: "Unlocked",
      icon: <Smile className="w-8 h-8  text-primary-foreground" />,
    },
    {
      title: "Daily Meditation",
      state: "Locked",
      icon: <Medal className="w-8 h-8  text-primary-foreground" />,
    },
    {
      title: "First Kia Session",
      state: "Locked",
      icon: <Trophy className="w-8 h-8  text-primary-foreground" />,
    },
    {
      title: "Help someone",
      state: "Unlocked",
      icon: <PersonStanding className="w-8 h-8  text-primary-foreground" />,
    },
    {
      title: "5 sessions in a row",
      state: "Unlocked",
      icon: <NotebookTabs className="w-8 h-8  text-primary-foreground" />,
    },
  ];

  return (
    <div className="animate__animated animate__fadeInRight text-foreground rounded-lg p-6 w-full max-w-3xl mx-auto bg-[#ffffff] dark:bg-[#181a1b]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Your Badges
        </h1>
        <DrawerDemo />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-4">
        {goals.map((goal) => (
          <GoalCard
            icon={goal.icon}
            state={goal.state}
            title={goal.title}
            key={goal.title}
          />
        ))}
      </div>
    </div>
  );
}
