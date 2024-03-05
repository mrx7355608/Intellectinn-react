import { Heading, VStack, Divider } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import ContinueWithGoogle from "../../components/form/ContinueWithGoogle";

export default function Login() {
    return (
        <VStack w={"full"}>
            <Heading as="h1" size={"lg"} mb={"14"}>
                Login to your account
            </Heading>
            <LoginForm />
            <Divider my="7" />
            <ContinueWithGoogle />
        </VStack>
    );
}
