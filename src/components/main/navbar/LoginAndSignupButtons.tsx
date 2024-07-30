import { Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function LoginAndSignupButtons() {
    return (
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
    );
}
