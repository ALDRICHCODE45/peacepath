"use client";
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
import { generateId } from "ai";

export const icons = [
  {
    icon: <Smile className="w-8 h-8 text-primary-foreground" />,
  },
  {
    icon: <Medal className="w-8 h-8 text-primary-foreground" />,
  },
  {
    icon: <Trophy className="w-8 h-8 text-primary-foreground" />,
  },
  {
    icon: <PersonStanding className="w-8 h-8 text-primary-foreground" />,
  },
  {
    icon: <NotebookTabs className="w-8 h-8 text-primary-foreground" />,
  },
  {
    icon: <NotebookTabs className="w-8 h-8 text-primary-foreground" />,
  },
  {
    icon: <Heart className="w-8 h-8 text-primary-foreground" />,
  },
  {
    icon: <Leaf className="w-8 h-8 text-primary-foreground" />,
  },
  {
    icon: <CloudLightning className="w-8 h-8 text-primary-foreground" />,
  },
  {
    icon: <Star className="w-8 h-8 text-primary-foreground" />,
  },
  {
    icon: <Handshake className="w-8 h-8 text-primary-foreground" />,
  },
  {
    icon: <Globe className="w-8 h-8 text-primary-foreground" />,
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-primary-foreground" />,
  },
  {
    icon: <Music className="w-8 h-8 text-primary-foreground" />,
  },
  {
    icon: <BookOpen className="w-8 h-8 text-primary-foreground" />,
  },
  {
    icon: <Rocket className="w-8 h-8 text-primary-foreground" />,
  },
];

// Define an enum for the goal states
enum GoalState {
  Unlocked = "Unlocked",
  Locked = "Locked",
}

// Define the interface for the goals
interface Goal {
  title: string;
  state: GoalState;
  //icon: React.ReactNode;
  id: string;
}

// Define the list for initial goals
export const goalsInit: Goal[] = [
  {
    title: "Positive Mindset",
    state: GoalState.Locked,
    id: generateId(),
  },
  {
    title: "Daily Meditation",
    state: GoalState.Locked,
    id: generateId(),
  },
  {
    title: "First Kia Session",
    state: GoalState.Locked,
    id: generateId(),
  },
  {
    title: "Help Someone",
    state: GoalState.Locked,
    id: generateId(),
  },
  {
    title: "5 Sessions in a Row",
    state: GoalState.Locked,
    id: generateId(),
  },
  {
    title: "Make Peace with Your Parents",
    state: GoalState.Locked,
    id: generateId(),
  },
  {
    title: "Gratitude Journal",
    state: GoalState.Locked,
    id: generateId(),
  },
  {
    title: "Nature Walk",
    state: GoalState.Locked,
    id: generateId(),
  },
  {
    title: "Energy Boost",
    state: GoalState.Locked,
    id: generateId(),
  },
  {
    title: "Reach for the Stars",
    state: GoalState.Locked,
    id: generateId(),
  },
  {
    title: "Kindness Act",
    state: GoalState.Locked,
    id: generateId(),
  },
  {
    title: "Global Awareness",
    state: GoalState.Locked,
    id: generateId(),
  },
  {
    title: "Bright Ideas",
    state: GoalState.Locked,
    id: generateId(),
  },
  {
    title: "Music Therapy",
    state: GoalState.Locked,
    id: generateId(),
  },
  {
    title: "Read a Book",
    state: GoalState.Locked,
    id: generateId(),
  },
  {
    title: "Launch Your Dream",
    state: GoalState.Locked,
    id: generateId(),
  },
];
