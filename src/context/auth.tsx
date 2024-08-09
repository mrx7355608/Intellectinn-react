import { create } from "zustand";
import { IUser } from "../types/user";

type Store = {
    user: IUser | null;
    setUser: (user: IUser) => void;
    logoutUser: () => void;
};

export const useAuth = create<Store>()((set) => ({
    user: null,
    setUser: (user) => set(() => ({ user: user })),
    logoutUser: () => set(() => ({ user: null })),
}));
