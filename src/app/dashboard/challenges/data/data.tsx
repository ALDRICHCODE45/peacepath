import { generateId } from "ai";
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
enum GoalState {
  Unlocked = "Unlocked",
  Locked = "Locked",
}

// Define the interface for the goals
interface Goal {
  title: string;
  state: GoalState;
  icon: React.ReactNode;
  id: string;
}

// Define the list for goals
export const goalsInit: Goal[] = [
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
