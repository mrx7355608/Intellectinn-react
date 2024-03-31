import { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MainlayoutSpinner from "../components/Spinners/MainlayoutSpinner";
import Navbar from "../components/Navbar";
import { useAuthContext } from "../context/auth";

export default function MainLayout() {
    return (
        <Suspense fallback={<MainlayoutSpinner />}>
            <Navbar />
            <Outlet />
        </Suspense>
    );
}
