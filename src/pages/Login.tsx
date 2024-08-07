import { Heading, VStack, Divider, Text } from "@chakra-ui/react";
import LoginForm from "../components/form/LoginForm";
import ContinueWithGoogle from "../components/form/ContinueWithGoogle";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <VStack w={"full"}>
            <Heading as="h1" size={"lg"} mb={"14"}>
                Login to your account
            </Heading>
            <LoginForm />
            <Divider my="7" />
            <ContinueWithGoogle />
            <Text mt={"4"}>
                Not a member?{" "}
                <Link to="/auth/signup">
                    <Text as="span" fontWeight={"medium"} color="teal">
                        Signup
                    </Text>
                </Link>
            </Text>
        </VStack>
    );
}
