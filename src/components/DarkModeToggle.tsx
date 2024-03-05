import { Button } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { IoMoonSharp } from "react-icons/io5";
import { FaSun } from "react-icons/fa";

export default function DarkModeToggle() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Button onClick={toggleColorMode} bg="transparent">
            {colorMode === "light" ? <IoMoonSharp /> : <FaSun />}
        </Button>
    );
}
