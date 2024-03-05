import { Heading, VStack, Divider } from "@chakra-ui/react";
import SignupForm from "./SignupForm";
import ContinueWithGoogle from "../../components/form/ContinueWithGoogle";

export default function Signup() {
    return (
        <VStack w={"full"}>
            <Heading as="h1" size={"lg"} mb={"14"}>
                Create your account
            </Heading>
            <SignupForm />
            <Divider my="7" />
            <ContinueWithGoogle />
        </VStack>
    );
}
