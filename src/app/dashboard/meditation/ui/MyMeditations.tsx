"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAudioStore } from "@/store/audios.store";
import { Play } from "lucide-react";
import { AlertCrateMeditation } from "@/components/alert/AlertDialog";
import { cn } from "@/utils/cn";

export function MyMeditations() {
  const setActiveAudio = useAudioStore((store) => store.setActiveAudio);
  const userMeditations = useAudioStore((store) => store.audios);
  const activeAudio = useAudioStore((store) => store.activeAudio);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">My Meditations</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My Meditations</SheetTitle>
          <SheetDescription>
            This is a place where you can listen to your personal meditations.
          </SheetDescription>
        </SheetHeader>

        <div className="flex justify-between items-center mb-4 mt-4">
          <AlertCrateMeditation />
        </div>

        <div className="grid gap-4 py-4">
          {userMeditations.map((meditation) => (
            <div
              className={cn(
                "flex justify-between items-center w-[100%] border border-gray-300 rounded-md p-2 bg-white shadow-sm",
                {
                  "bg-blue-50": meditation.url === activeAudio,
                }
              )}
              key={meditation.url}
            >
              <div className="flex items-center">
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => setActiveAudio(meditation.url)}
                    className="mr-2"
                  >
                    <Play />
                  </Button>
                </SheetClose>

                <span className="font-normal text-black">Meditation</span>
              </div>
            </div>
          ))}
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Regresar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
