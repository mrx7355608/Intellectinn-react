import { ReactNode } from "react";
import { useAuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user } = useAuthContext();
    return user ? children : <Navigate to={"/auth/login"} />;
}
