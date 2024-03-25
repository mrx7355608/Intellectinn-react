import { Box, Text, Heading } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/auth";
import Searchbar from "../Searchbar";
import UserInfo from "./UserInfo";
import LoginAndSignupButtons from "./LoginAndSignupButtons";

export default function Navbar() {
    const { pathname } = useLocation();
    const { user } = useAuthContext();

    return (
        <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            px={"14"}
            py={"3"}
            shadow={"sm"}
            bg={pathname === "/" ? "transparent" : "white"}
            w={"full"}
            pos={"fixed"}
            top={"0"}
            borderBottom={"1px"}
            color={"black"}
            borderColor={pathname === "/" ? "gray.600" : "gray.200"}
            zIndex={3}
        >
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={"3"}
            >
                <Heading ml={"9"} fontWeight={"bold"} fontSize={"2xl"}>
                    Intellect-Inn
                </Heading>
                {pathname === "/" ? null : <Searchbar />}
            </Box>
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={"5"}
                mr={"9"}
                fontSize={"sm"}
            >
                <Link to={"/"}>
                    <Text _hover={{ color: "teal.500" }}>Home</Text>
                </Link>

                <Link to={"/write"}>
                    <Text mx="1" _hover={{ color: "teal.500" }}>
                        Write
                    </Text>
                </Link>
                {user ? <UserInfo /> : <LoginAndSignupButtons />}
            </Box>
        </Box>
    );
}
