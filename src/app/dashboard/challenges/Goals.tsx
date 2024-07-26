import { DrawerDemo } from "./ui/Progress";
import {
  BookOpen,
  CloudLightning,
  Globe,
  Handshake,
  Heart,
  Leaf,
  Lightbulb,
  Medal,
  Music,
  NotebookTabs,
  PersonStanding,
  Rocket,
  Smile,
  Star,
  Trophy,
} from "lucide-react";
import { GoalCard } from "./ui/GoalCard";
import { useGoalsStore } from "@/store/goals/goals.sotore";
import { generateId } from "ai";

enum GoalState {
  Unlocked = "Unlocked",
  Locked = "Locked",
}

// Define the interface for the goals
interface Goal {
  title: string;
  state: GoalState;
  icon: JSX.Element;
  id: string;
}

// Define the list for goals
const goals: Goal[] = [
  {
    title: "Positive Mindset",
    state: GoalState.Unlocked,
    icon: <Smile className="w-8 h-8 text-primary-foreground" />,
    id: generateId(),
  },
  {
    title: "Daily Meditation",
    state: GoalState.Locked,
    icon: <Medal className="w-8 h-8 text-primary-foreground" />,
    id: generateId(),
  },
  {
    title: "First Kia Session",
    state: GoalState.Locked,
    icon: <Trophy className="w-8 h-8 text-primary-foreground" />,
    id: generateId(),
  },
  {
    title: "Help Someone",
    state: GoalState.Unlocked,
    icon: <PersonStanding className="w-8 h-8 text-primary-foreground" />,
    id: generateId(),
  },
  {
    title: "5 Sessions in a Row",
    state: GoalState.Unlocked,
    icon: <NotebookTabs className="w-8 h-8 text-primary-foreground" />,
    id: generateId(),
  },
  {
    title: "Make Peace with Your Parents",
    state: GoalState.Unlocked,
    icon: <NotebookTabs className="w-8 h-8 text-primary-foreground" />,
    id: generateId(),
  },
  {
    title: "Gratitude Journal",
    state: GoalState.Locked,
    icon: <Heart className="w-8 h-8 text-primary-foreground" />,
    id: generateId(),
  },
  {
    title: "Nature Walk",
    state: GoalState.Unlocked,
    icon: <Leaf className="w-8 h-8 text-primary-foreground" />,
    id: generateId(),
  },
  {
    title: "Energy Boost",
    state: GoalState.Locked,
    icon: <CloudLightning className="w-8 h-8 text-primary-foreground" />,
    id: generateId(),
  },
  {
    title: "Reach for the Stars",
    state: GoalState.Unlocked,
    icon: <Star className="w-8 h-8 text-primary-foreground" />,
    id: generateId(),
  },
  {
    title: "Kindness Act",
    state: GoalState.Unlocked,
    icon: <Handshake className="w-8 h-8 text-primary-foreground" />,
    id: generateId(),
  },
  {
    title: "Global Awareness",
    state: GoalState.Locked,
    icon: <Globe className="w-8 h-8 text-primary-foreground" />,
    id: generateId(),
  },
  {
    title: "Bright Ideas",
    state: GoalState.Unlocked,
    icon: <Lightbulb className="w-8 h-8 text-primary-foreground" />,
    id: generateId(),
  },
  {
    title: "Music Therapy",
    state: GoalState.Unlocked,
    id: generateId(),
    icon: <Music className="w-8 h-8 text-primary-foreground" />,
  },
  {
    title: "Read a Book",
    state: GoalState.Unlocked,
    icon: <BookOpen className="w-8 h-8 text-primary-foreground" />,
    id: generateId(),
  },
  {
    title: "Launch Your Dream",
    state: GoalState.Unlocked,
    icon: <Rocket className="w-8 h-8 text-primary-foreground" />,
    id: generateId(),
  },
];

export default function Goals() {
  useGoalsStore((store) => store.setGoals)(goals);
  const userGoals = useGoalsStore((store) => store.goals);

  return (
    <div className="animate__animated animate__fadeInRight text-foreground rounded-lg p-6 w-full max-w-3xl mx-auto bg-[#ffffff] dark:bg-[#181a1b]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Your Badges
        </h1>
        <DrawerDemo />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-4">
        {userGoals.map((goal) => (
          <GoalCard
            goalId={goal.id}
            icon={goal.icon}
            state={goal.state}
            title={goal.title}
            key={goal.id}
          />
        ))}
      </div>
    </div>
  );
}
