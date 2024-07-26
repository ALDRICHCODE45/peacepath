"use client";
import "animate.css";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Pause, Play, Music } from "lucide-react";
import { AudioI, useAudioStore } from "@/store/audios.store";
import { MyMeditations } from "./MyMeditations";
import { MeditationLoading } from "@/components/loading/Loading";

interface Props {
  initialAudios?: AudioI[];
}

export default function Reproduction({ initialAudios = [] }: Props) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const setUserAudios = useAudioStore((store) => store.setUserAudios);
  const cleanActiveAudio = useAudioStore((store) => store.cleanActiveAudio);

  const activeAudio = useAudioStore((store) => store.activeAudio);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    setUserAudios(initialAudios);
    setLoaded(true);
  }, [initialAudios, setUserAudios]);

  useEffect(() => {
    if (activeAudio) {
      if (audio) {
        audio.pause();
        setAudio(null);
        setIsPlaying(false);
      }
      const newAudio = new Audio(activeAudio);
      setAudio(newAudio);

      newAudio.addEventListener("ended", handleAudioEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleAudioEnded);
      }
    };
  }, [activeAudio]);

  const handleAudioEnded = () => {
    setIsPlaying(false);
    cleanActiveAudio();
  };

  if (!loaded) {
    return <MeditationLoading />;
  }

  const togglePlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="animate__animated animate__fadeInDown">
      <MyMeditations />
      <div className="grid grid-cols-1 gap-8 p-4">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-4xl font-semibold text-center mb-4 text-black dark:text-white">
            My Meditations
          </h1>
          <p className="text-lg text-center mb-8 text-gray-700 dark:text-gray-300">
            Take a moment to relax and follow this guided meditation.
          </p>

          {activeAudio ? (
            <>
              <Button
                onClick={togglePlay}
                variant="ghost"
                size="lg"
                disabled={audio === null}
                className="bg-primary dark:bg-white text-primary-foreground dark:text-black rounded-full w-20 h-20 flex items-center justify-center hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </Button>

              {isPlaying && (
                <div className="mt-8">
                  <div className="playing-animation flex space-x-1">
                    <div className="bar bg-blue-600"></div>
                    <div className="bar bg-blue-600"></div>
                    <div className="bar bg-blue-600"></div>
                    <div className="bar bg-blue-600"></div>
                    <div className="bar bg-blue-600"></div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <Music className="w-16 h-16 text-gray-400" />
              <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                Ninguna meditación seleccionada.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8">
          <p className="text-center text-gray-600 dark:text-gray-400 italic">
            “You are strong. You are capable. You deserve peace and happiness.”
          </p>
        </div>
      </div>
    </div>
  );
}
