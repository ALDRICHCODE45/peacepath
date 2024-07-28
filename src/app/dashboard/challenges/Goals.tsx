"use client";
import { DrawerDemo } from "./ui/Progress";
import { GoalCard } from "./ui/GoalCard";
import { Medal, PackageOpen } from "lucide-react";
import { Challenge } from "@prisma/client";
import { crateNewChallenge } from "@/actions/createNewChallenge";
import { AlertCreateChallenge } from "@/components/meditation/alert/AlertNewChallenge";
import { useEffect, useState } from "react";

interface Props {
  initialGoals: Challenge[];
}

export default function Goals({ initialGoals }: Props) {
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    setLoad(true);
  }, []);

  if (!load) {
    return <span>loading</span>;
  }

  return (
    <>
      <div>
        <AlertCreateChallenge handleNewChallenge={crateNewChallenge} />
      </div>
      <div className="animate__animated animate__fadeInRight text-foreground rounded-lg p-6 w-full max-w-3xl mx-auto bg-[#ffffff] dark:bg-[#181a1b] ">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Your Badges
          </h1>
          <DrawerDemo />
        </div>
        {!initialGoals.length ? (
          <div className="w-full h-full flex flex-col justify-center items-center mt-[100px]">
            <PackageOpen
              size={32}
              className="text-4xl text-black dark:text-white"
            />
            <span className="text-3xl text-black dark:text-white">
              Aun no tienes Desafios
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 w-full h-[calc(100vh-300px)] gap-5 overflow-y-scroll p-3">
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
