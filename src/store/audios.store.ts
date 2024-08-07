import { create } from "zustand";

export interface AudioI {
  url: string;
}

export interface AudioState {
  audios: AudioI[];
  addAudio: (audio: AudioI) => void;
  setUserAudios: (audios: AudioI[]) => void;
  activeAudio: string | null;
  setActiveAudio: (newUrl: string) => void;
  newAudio: (audio: AudioI) => void;
  cleanActiveAudio: () => void;
}

export const useAudioStore = create<AudioState>()((set, get) => ({
  audios: [],
  activeAudio: null,

  cleanActiveAudio() {
    set({ activeAudio: null });
  },

  setActiveAudio(newUrl: string) {
    set({ activeAudio: newUrl });
  },

  addAudio(newAudio: AudioI) {
    const { audios } = get();
    set({ audios: [...audios, newAudio] });
  },

  setUserAudios(audios: AudioI[]) {
    set({ audios: audios });
  },
  newAudio(audio) {
    const { audios } = get();
    set({ audios: [...audios, audio] });
  },
}));
