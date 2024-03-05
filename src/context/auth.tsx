import {
    createContext,
    useContext,
    ReactNode,
    useState,
    Dispatch,
    SetStateAction,
} from "react";

interface IUser {
    name: string;
    password: string;
    email: string;
    profilePicture: string;
}

interface IAuthContext {
    user: IUser | null;
    setUser: Dispatch<SetStateAction<IUser | null>>;
}

const initialState: IAuthContext = {
    user: null,
    setUser: () => null,
};

const AuthContext = createContext<IAuthContext>(initialState);
export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}
