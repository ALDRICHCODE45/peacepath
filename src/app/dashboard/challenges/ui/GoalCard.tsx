import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import React from "react";

interface Props {
  title: string;
  state: string;
  icon: React.ReactNode;
}

export const GoalCard = ({ icon, state, title }: Props) => {
  return (
    <>
      <Card className="dark:bg-[#181a1b] rounded-lg p-4 flex flex-col items-center justify-center border dark:border-[#363b3d]">
        <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mb-2 border border-[#363b3d]">
          {icon}
        </div>
        <div className="flex flex-col items-center justify-between ">
          <p className="text-sm font-medium text-black dark:text-white">
            {title}
          </p>
          <Badge
            variant="outline"
            className="text-black dark:text-[#e5e3df] border dark:border-[#363b3d] mt-2"
          >
            {state}
          </Badge>
        </div>
      </Card>
    </>
  );
};
