"use client";
import { createPersonalMeditation } from "@/actions/createPersonalMeditation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAudioStore } from "@/store/audios.store";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function AlertCrateMeditation() {
  const addNewAudio = useAudioStore((store) => store.addAudio);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateMeditation = async () => {
    setIsLoading(true);
    try {
      const resp = await createPersonalMeditation();
      const newAudioParams = {
        url: resp,
      };
      console.log({ newAudioParams });
      addNewAudio(newAudioParams);
      console.log({ msg: "AlertDialog" });
      console.log({ resp });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isLoading} variant="outline">
          {isLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
          Create Meditation
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. A personalized meditation will be
            created.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleCreateMeditation}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
