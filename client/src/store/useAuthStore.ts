import { create } from "zustand";
import { IUser } from "../types/IUser";

interface UserStore {
  current: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const useAuthStore = create<UserStore>((set) => ({
  current: null,
  setUser: (current) => set({ current }),
}));
