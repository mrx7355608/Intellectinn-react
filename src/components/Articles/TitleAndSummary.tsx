import { Heading, Box, Text, Image } from "@chakra-ui/react";

export default function TitleAndSummary() {
    return (
        <Box py="2">
            <Box
                display="flex"
                alignItems="start"
                justifyContent="space-between"
                mt="1"
            >
                <Box>
                    <Heading fontSize="xl">My fisrt blog title</Heading>
                    <Text mt="2">
                        This is an article's summary. This is an article's
                        summary. This is an article's summary. This is an
                        summary.
                    </Text>
                </Box>
                <Image
                    src="/hero.jpg"
                    alt="thumbnail"
                    w="150px"
                    h="full"
                    ml="7"
                />
            </Box>
        </Box>
    );
}
