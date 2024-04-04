import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import MainlayoutSpinner from "../components/Spinners/MainlayoutSpinner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
    return (
        <Suspense fallback={<MainlayoutSpinner />}>
            <Navbar />
            <Outlet />
            <Footer />
        </Suspense>
    );
}
