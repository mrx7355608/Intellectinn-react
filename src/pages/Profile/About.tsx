import { Box, Text } from "@chakra-ui/react";
import AboutModal from "./AboutModal";
import { useAuthContext } from "../../context/auth";

export default function About() {
    const { user } = useAuthContext();

    return (
        <>
            {user?.about ? (
                <>
                    <Text whiteSpace={"break-spaces"} fontSize="lg">
                        {user?.about}
                    </Text>
                    <AboutModal />
                </>
            ) : (
                <Box
                    display="flex"
                    justifyItems={"center"}
                    alignItems={"center"}
                    flexDirection="column"
                    rounded="lg"
                    bg="gray.100"
                    p="16"
                >
                    <Text fontWeight={"bold"}>
                        Tell the world about yourself
                    </Text>
                    <Text color="gray.600" px="16" textAlign="center" mt="2">
                        Here's where you can share more about yourself your
                        history, work, experience, accomplishments, interests,
                        dreams, and more.
                    </Text>
                    <AboutModal />
                </Box>
            )}
        </>
    );
}
