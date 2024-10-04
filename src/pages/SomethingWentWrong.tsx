import { VStack, Heading, Text } from "@chakra-ui/react";

export default function SomethingWentWrong() {
    return (
        <VStack justifyContent={"center"} minH={"100vh"}>
            <Heading fontSize={"5xl"}>Something went wrong</Heading>
            <Text color="gray.600" mt={3} fontSize={"xl"}>
                An error occured while trying to process your request
            </Text>
            {/* TODO: add a way to recover from this error */}
        </VStack>
    );
}
