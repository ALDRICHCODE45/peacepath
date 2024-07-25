import { Skeleton } from "@/components/ui/skeleton";
import { type ReactElement } from "react";

export interface LoadingProps {}

export default function Loading({}: LoadingProps): ReactElement {
  return (
    <div className="flex flex-col h-full md:h-[calc(100vh-150px)]">
      <div className="flex-grow p-4 overflow-y-scroll ">
        <Skeleton className="w-full h-[60px] rounded-xl mb-4 bg-[#f4f4f5] " />
        <Skeleton className="md:ml-[72px] w-[250px] h-[250px] rounded-xl mb-4 bg-[#f4f4f5]" />
        <Skeleton className="w-full h-[60px] rounded-xl mb-4 bg-[#f4f4f5]" />
        <Skeleton className="w-full h-[60px] rounded-xl mb-4 bg-[#f4f4f5]" />
        <Skeleton className="w-full h-[60px] rounded-xl mb-4 bg-[#f4f4f5]" />
      </div>
      <div className="sticky bottom-0 w-full bg-white dark:bg-[#181a1b] p-4 border-t dark:border-[#363b3d]">
        <div className="flex items-center gap-4">
          <Skeleton className="flex-grow h-[40px] rounded-lg bg-[#f4f4f5] text-black dark:text-white" />
          <Skeleton className="w-[100px] h-[40px] rounded-lg bg-[#f4f4f5]" />
        </div>
      </div>
    </div>
  );
}
