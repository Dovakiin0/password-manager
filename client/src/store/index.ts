import { create } from "zustand";
import { IUser } from "../types/IUser";

interface UserStore {
  current: IUser | null;
  setUser: (user: IUser) => void;
}

export const useAuthStore = create<UserStore>((set) => ({
  current: null,
  setUser: (current: IUser) => set({ current }),
}));
