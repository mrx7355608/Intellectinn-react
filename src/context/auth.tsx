import { create } from "zustand";
import { IUser } from "../types/user";

type Store = {
    user: IUser | null;
    loginUser: (user: IUser) => void;
    logoutUser: () => void;
};

export const useAuth = create<Store>()((set) => ({
    user: null,
    loginUser: (user) => set(() => ({ user: user })),
    logoutUser: () => set(() => ({ user: null })),
}));
