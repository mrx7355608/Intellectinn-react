import { ReactNode } from "react";
import { useAuth } from "../../context/auth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    return user ? children : <Navigate to={"/auth/login"} />;
}
