import { Heading, Box } from "@chakra-ui/react";

export default function EditorsPick() {
    return (
        <Box mt="16" mb="10">
            <Heading fontSize="md" mb="7">
                Staff picks
            </Heading>
            <Box mt="6">
                <Author />
                <Heading fontSize="md" mt="2" color="gray.700">
                    How typescript can be haunting for some people
                </Heading>
            </Box>

            <Box mt="6">
                <Author />
                <Heading fontSize="md" mt="2" color="gray.700">
                    Why people feel inferiority complex and compare
                </Heading>
            </Box>

            <Box mt="6">
                <Author />
                <Heading fontSize="md" mt="2" color="gray.700">
                    The future of poetry
                </Heading>
            </Box>
        </Box>
    );
}
