import { Box, Text } from "@chakra-ui/react";
import AboutModal from "./AboutModal";
import { useAuthContext } from "../../context/auth";
import { IUser } from "../../types/user";

export default function About({ profile }: { profile: IUser }) {
    const { user } = useAuthContext();

    return (
        <>
            {/* Show about section if it is present */}
            {profile.about ? (
                <>
                    <Text whiteSpace={"break-spaces"} fontSize="lg">
                        {profile.about}
                    </Text>
                    <AboutModal />
                </>
            ) : /*
             * Otherwise, check if profile that is currently being viewed is of logged in user's profile
             * if so, then display an edit about UI
             */
            profile._id === user?._id ? (
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
            ) : (
                /* Otherwise, display this text */
                <Text fontStyle={"italic"} color="gray.500">
                    No about content provided
                </Text>
            )}
        </>
    );
}
