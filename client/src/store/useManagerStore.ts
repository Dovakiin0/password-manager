import { create } from "zustand";
import { IPassword } from "../types/IPassword";

interface ManagerStore {
  passwords: IPassword[];
  filteredPasswords: IPassword[];
  setPasswords: (passwords: IPassword[]) => void;
  searchPasswords: (query: string) => void;
  createPassword: (password: IPassword) => void;
  updatePassword: (_id: string, password: IPassword) => void;
  deletePassword: (_id: string) => void;
}

export const useManagerStore = create<ManagerStore>((set, get) => ({
  passwords: [],
  filteredPasswords: [],
  setPasswords: (passwords) => set({ passwords, filteredPasswords: passwords }),
  searchPasswords: (query) => {
    set((state) => {
      if (query === "") {
        return { filteredPasswords: state.passwords };
      }

      return {
        filteredPasswords: state.passwords.filter(
          (pw) =>
            pw.username.toLowerCase().includes(query.toLowerCase()) ||
            pw.websiteUri.toLowerCase().includes(query.toLowerCase()),
        ),
      };
    });
  },
  createPassword: (password) =>
    set((state) => ({
      filteredPasswords: [...state.passwords, password],
    })),
  updatePassword: (_id, password) => {
    set((state) => {
      const updatedPasswords = state.passwords.map((pw) => {
        if (pw._id === password._id) {
          return password;
        }
        return pw;
      });

      return {
        filteredPasswords: updatedPasswords,
      };
    });
  },
  deletePassword: (_id) => {
    set((state) => {
      const updatedPasswords = state.passwords.filter((pw) => pw._id !== _id);

      return {
        filteredPasswords: updatedPasswords,
      };
    });
  },
}));
