import { Skeleton } from "@/components/ui/skeleton";
import { type ReactElement } from "react";

export interface LoadingProps {}

export function MeditationLoading({}: LoadingProps): ReactElement {
  return (
    <div className="animate__animated animate__fadeInDown">
      <div className="grid grid-cols-1 gap-8 p-4">
        <div className="flex justify-center items-center flex-col">
          <Skeleton className="w-[200px] h-[40px] mb-4" />
          <Skeleton className="w-[300px] h-[20px] mb-8" />

          <Skeleton className="bg-primary dark:bg-white text-primary-foreground dark:text-black rounded-full w-20 h-20 mb-8" />

          <div className="mt-8">
            <div className="flex space-x-1">
              <Skeleton className="w-1 h-8 bg-blue-600" />
              <Skeleton className="w-1 h-8 bg-blue-600" />
              <Skeleton className="w-1 h-8 bg-blue-600" />
              <Skeleton className="w-1 h-8 bg-blue-600" />
              <Skeleton className="w-1 h-8 bg-blue-600" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center h-full mt-8">
            <Skeleton className="w-16 h-16" />
            <Skeleton className="w-[200px] h-[20px] mt-4" />
          </div>
        </div>

        <div className="mt-8">
          <Skeleton className="w-[300px] h-[20px] mx-auto" />
        </div>
      </div>
    </div>
  );
}
