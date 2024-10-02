import { create } from "zustand";
import { IUser } from "../types/user";

type Store = {
    user: IUser | null;
    loginUser: (user: IUser) => void;
    logoutUser: () => void;
    updateAbout: (about: string) => void;
    updateProfilePicture: (profilePicture: string) => void;
    addFollower: (followerID: string) => void;
    removeFollower: (followerID: string) => void;
    addFollowing: (followingID: string) => void;
    removeFollowing: (followingID: string) => void;
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

    addFollower: (followerID) =>
        set((state) => ({
            user: updateUserHelper(state, {
                followers: [...(state.user?.followers || []), followerID],
            }),
        })),

    removeFollower: (followerID) =>
        set((state) => ({
            user: updateUserHelper(state, {
                followers: state.user?.followers.filter(
                    (id) => id !== followerID,
                ),
            }),
        })),

    addFollowing: (followingID) =>
        set((state) => ({
            user: updateUserHelper(state, {
                following: [...(state.user?.following || []), followingID],
            }),
        })),

    removeFollowing: (followingID) =>
        set((state) => ({
            user: updateUserHelper(state, {
                followers: state.user?.following.filter(
                    (id) => id !== followingID,
                ),
            }),
        })),
}));
