import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import MainlayoutSpinner from "../components/Spinners/MainlayoutSpinner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box } from "@chakra-ui/react";

export default function MainLayout() {
    return (
        <Suspense fallback={<MainlayoutSpinner />}>
            <Navbar />
            <Box minH="100vh">
                <Outlet />
            </Box>
            <Footer />
        </Suspense>
    );
}
