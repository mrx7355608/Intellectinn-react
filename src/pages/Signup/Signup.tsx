import { Heading, VStack, Divider } from "@chakra-ui/react";
import SignupForm from "./SignupForm";
import ContinueWithGoogle from "../../components/form/ContinueWithGoogle";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Signup() {
    return (
        <VStack w={"full"}>
            <Heading as="h1" size={"lg"} mb={"14"}>
                Create your account
            </Heading>
            <SignupForm />
            <Divider my="7" />
            <ContinueWithGoogle />
            <Text mt={"4"}>
                Already a member?{" "}
                <Link to="/auth/login">
                    <Text as="span" fontWeight={"medium"} color="teal">
                        Login
                    </Text>
                </Link>
            </Text>
        </VStack>
    );
}
