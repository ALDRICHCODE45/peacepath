import { Loader2 } from "lucide-react";
import { type ReactElement } from "react";

export interface LoadingProps {}

export default function Loading({}: LoadingProps): ReactElement {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="">
        <Loader2
          size={45}
          className="text-black dark:text-white animate-spin font-bold"
        />
      </div>
    </div>
  );
}
