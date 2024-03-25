import { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MainlayoutSpinner from "../components/Spinners/MainlayoutSpinner";
import Navbar from "../components/Navbar";
import { useAuthContext } from "../context/auth";

export default function MainLayout() {
    const { user } = useAuthContext();
    const navTo = useNavigate();

    useEffect(() => {
        if (!user) {
            navTo("/auth/login");
        }
    }, [navTo, user])

    return (
        <Suspense fallback={<MainlayoutSpinner />}>
            <Navbar />
            <Outlet />
        </Suspense>
    );
}
