import { create } from "zustand";
import { UserDTO } from "../interfaces/types";


export interface User {
    user: UserDTO;
}

export interface UserState {
    user: User | null;
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
    setUser: (user: User) => void;
    logout: () => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isLoading: true,
    setLoading: (isLoading) => set({ isLoading }),
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
    clearUser: () => set({ user: null }),
}));
