import { create } from "zustand";
import { IPassword } from "../types/IPassword";

interface ManagerStore {
  passwords: IPassword[];
  setPasswords: (passwords: IPassword[]) => void;
  createPassword: (password: IPassword) => void;
  updatePassword: (_id: string, password: IPassword) => void;
  deletePassword: (_id: string) => void;
}

export const useManagerStore = create<ManagerStore>((set, get) => ({
  passwords: [],
  setPasswords: (passwords) => set({ passwords }),
  createPassword: (password) =>
    set({ passwords: [...get().passwords, password] }),
  updatePassword: (_id, password) => {
    const index = get().passwords.findIndex((pw) => pw._id === password._id);
    if (index !== -1) {
      get().passwords[index] = password;
    }
  },
  deletePassword: (_id) => {
    set((state) => {
      const updatedPasswords = state.passwords.filter((pw) => pw._id !== _id);

      return { passwords: updatedPasswords };
    });
  },
}));
