import { Spinner } from "@chakra-ui/react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
export default function MainLayout() {
    return (
        <Suspense fallback={<Spinner />}>
            <Outlet />
        </Suspense>
    );
}
