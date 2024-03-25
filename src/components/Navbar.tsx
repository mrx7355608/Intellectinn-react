import { Box, Text, Heading, Button, Image } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import Searchbar from "./Searchbar";
import { useAuthContext } from "../context/auth";

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

                {user ? (
                    <Box display="flex" gap="5" alignItems="center">
                        <Link to="/user">
                            <Text
                                fontSize="sm"
                                fontWeight="medium"
                                _hover={{
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                }}
                            >
                                {user.name}
                            </Text>
                        </Link>
                        <Image
                            src={user.profilePicture}
                            alt="user profile picture"
                            w="40px"
                            h="40px"
                            objectFit="cover"
                            rounded="full"
                        />
                    </Box>
                ) : (
                    <>
                        <Link to={"/auth/login"}>
                            <Text mx="1" _hover={{ color: "teal.500" }}>
                                Login
                            </Text>
                        </Link>
                        <Link to={"/auth/Signup"}>
                            <Button
                                rounded={"full"}
                                px={"5"}
                                pb={"0.5"}
                                colorScheme="teal"
                                size={"sm"}
                            >
                                Signup
                            </Button>
                        </Link>
                    </>
                )}
            </Box>
        </Box>
    );
}
