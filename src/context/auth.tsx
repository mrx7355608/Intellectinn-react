import { create } from "zustand";
import { IUser } from "../types/user";

type Store = {
    user: IUser | null;
    loginUser: (user: IUser) => void;
    logoutUser: () => void;
    updateAbout: (about: string) => void;
    updateProfilePicture: (profilePicture: string) => void;
    updateFollowings: (newFollowings: string[]) => void;
    updateInterests: (interests: string[]) => void;
};

const updateUserHelper = (state: Store, updates: Partial<IUser>) => {
    if (!state.user) {
        return state.user;
    }

    return { ...state.user, ...updates };
};

export const useAuth = create<Store>()((set) => ({
    user: null,
    loginUser: (user) => set(() => ({ user })),
    logoutUser: () => set(() => ({ user: null })),
    updateAbout: (about) =>
        set((state) => ({
            user: updateUserHelper(state, { about }),
        })),

    updateProfilePicture: (profilePicture) =>
        set((state) => ({
            user: updateUserHelper(state, { profilePicture }),
        })),

    updateFollowings: (newFollowings) =>
        set((state) => ({
            user: updateUserHelper(state, {
                following: newFollowings,
            }),
        })),

    updateInterests: (updatedInterests) =>
        set((state) => ({
            user: updateUserHelper(state, {
                topicsInterestedIn: updatedInterests,
            }),
        })),
}));
