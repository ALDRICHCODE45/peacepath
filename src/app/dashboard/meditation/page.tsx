"use client";
import { useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MeditationPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio("/meditation.mp3"));

  useEffect(() => {
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-full pb-36 flex flex-col items-center justify-center p-4 ">
      <h1 className="text-4xl font-semibold text-center mb-4 text-black dark:text-white">
        Guided Meditation
      </h1>
      <p className="text-lg text-center mb-8 text-gray-700 dark:text-gray-300">
        Take a moment to relax and follow this guided meditation.
      </p>
      <Button
        onClick={togglePlay}
        variant="ghost"
        size="lg"
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
      <div className="mt-8">
        <p className="text-center text-gray-600 dark:text-gray-400 italic">
          “You are strong. You are capable. You deserve peace and happiness.”
        </p>
      </div>
    </div>
  );
}
