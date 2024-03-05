import { Text, useColorMode } from "@chakra-ui/react";

export default function ShowApiError({ error }: { error: string }) {
    const { colorMode } = useColorMode();

    return (
        <Text
            w={"full"}
            fontWeight={"medium"}
            color={colorMode === "light" ? "red.700" : "red.200"}
            bg={colorMode === "light" ? "red.100" : "red.900"}
            p={"3"}
            mb={"1"}
            rounded={"md"}
        >
            {error}
        </Text>
    );
}
