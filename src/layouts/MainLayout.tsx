import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import MainlayoutSpinner from "../components/main/MainlayoutSpinner";
import Navbar from "../components/main/navbar";
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
