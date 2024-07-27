"use client";
import { DrawerDemo } from "./ui/Progress";
import { GoalCard, sleep } from "./ui/GoalCard";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Layers3, Loader2, Medal } from "lucide-react";
import { Challenge } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { crateNewChallenge } from "@/actions/createNewChallenge";

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
    const { ok, error } = await crateNewChallenge();
    if (error || !ok) {
      setError(error!);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex justify-center my-4">
        <Button
          onClick={handleCreateGoals}
          variant="progress"
          className="w-[120px]"
          disabled={loading}
        >
          New Challenge
        </Button>
      </div>
      <div className="animate__animated animate__fadeInRight text-foreground rounded-lg p-6 w-full max-w-3xl mx-auto bg-[#ffffff] dark:bg-[#181a1b]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Your Badges
          </h1>
          <DrawerDemo />
        </div>
        {!initialGoals.length ? (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <Layers3
              size={32}
              className="text-4xl text-black dark:text-white"
            />
            <span className="text-3xl text-black dark:text-white">
              Aun no tienes Desafios
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 w-full h-full">
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
                description={goal.description}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
