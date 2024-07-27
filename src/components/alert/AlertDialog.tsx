"use client";
import {
  createPersonalMeditation,
  Error,
} from "@/actions/createPersonalMeditation";
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
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";

export function AlertCrateMeditation() {
  const addNewAudio = useAudioStore((store) => store.addAudio);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      //Todo:toast
      toast({
        variant: "destructive",
        title: "Uh oh! Algo salio mal.",
        description: error.message,
        //action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setIsLoading(false);
    }
  }, [error]);

  const handleCreateMeditation = async () => {
    setIsLoading(true);
    try {
      const { error, url } = await createPersonalMeditation();
      if (error) {
        setError(error);
        return;
      }
      if (!url) {
        return;
      }
      const newAudioParams = {
        url,
      };
      addNewAudio(newAudioParams);
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
          <AlertDialogTitle>Estas completamente seguro?</AlertDialogTitle>
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
