import { create } from "zustand";
import { UserFullData } from "../../interfaces/types";

interface SuppliersList {
  users: UserFullData[];         
  isLoading: boolean;            
  setLoading: (isLoading: boolean) => void;
  setUsers: (users: UserFullData[]) => void;
  addNewUser: (users: UserFullData) => void;
  updateUserStore: (company: UserFullData) => void;
  deleteUserStore: (userId: string) => void;
}

export const useUserListStore = create<SuppliersList>((set) => ({
  users: [],
  isLoading: true,
  setLoading: (isLoading) => set({ isLoading }),

  setUsers: (users) =>
    set({ users }),

  addNewUser: (user) =>
    set((state) => ({ users: [...state.users, user] })),

  updateUserStore: (user) => 
    set((state) => ({
      users: state.users.map((s: UserFullData) =>
        s.id === user.id ? user : s
      ),
    })),

  deleteUserStore: (userId) =>
    set((state) => ({
      users: state.users.filter((s: UserFullData) => s.id !== userId),
       })),
}));
