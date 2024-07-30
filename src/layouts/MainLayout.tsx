import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import MainlayoutSpinner from "../components/Spinners/MainlayoutSpinner";
import Navbar from "../components/navbar";
import Footer from "../components/main/Footer";
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
