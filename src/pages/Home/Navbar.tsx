import { Box, Text, Heading, Button } from "@chakra-ui/react";
import DarkModeToggle from "../../components/DarkModeToggle";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            px={"14"}
            py={"5"}
            shadow={"sm"}
            bg={"transparent"}
            w={"full"}
            pos={"fixed"}
            top={"0"}
            borderBottom={"1px"}
            color={"black"}
        >
            <Heading ml={"9"} fontWeight={"bold"} fontSize={"2xl"}>
                Intellect-Inn
            </Heading>
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={"5"}
                mr={"9"}
            >
                <Link to={"/"}>
                    <Text>Home</Text>
                </Link>
                <Link to={"/"}>
                    <Text mx="1">Write</Text>
                </Link>
                <Link to={"/auth/login"}>
                    <Text mx="1">Login</Text>
                </Link>
                <Link to={"/auth/Signup"}>
                    <Button
                        rounded={"full"}
                        px={"5"}
                        pb={"0.5"}
                        colorScheme="teal"
                    >
                        Signup
                    </Button>
                </Link>
                <DarkModeToggle />
            </Box>
        </Box>
    );
}
