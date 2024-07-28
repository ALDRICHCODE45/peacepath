"use client";
import { ReturnAgs } from "@/actions/createNewChallenge";
import { sleep } from "@/app/dashboard/challenges/ui/GoalCard";
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
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  handleNewChallenge: () => Promise<ReturnAgs>;
}

export function AlertCreateChallenge({ handleNewChallenge }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      //Todo:toast
      toast({
        variant: "destructive",
        title: "Uh oh! Algo salio mal.",
        description: error,
      });
      setIsLoading(false);
    }
  }, [error]);

  const handleNew = async () => {
    setIsLoading(true);
    await sleep(3);
    try {
      const { ok, error } = await handleNewChallenge();
      if (!ok || error) {
        setError(error!);
        return;
      }
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
          {isLoading ? (
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          ) : (
            "Create Challenge"
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas completamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta accion creara un nuevo reto basado en tus conversaciones con
            Kia
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleNew}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
