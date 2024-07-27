import { Loader2 } from "lucide-react";
import { type ReactElement } from "react";

export interface LoadingProps {}

export default function Loading({}: LoadingProps): ReactElement {
  return (
    <div className="w-full h-full flex justify-center items-center text-9xl">
      <div className="">
        <Loader2 className="text-black dark:text-white  animate-spin text-9xl" />
      </div>
    </div>
  );
}
