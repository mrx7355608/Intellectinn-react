import { Heading, Box, Text, Image } from "@chakra-ui/react";

export default function TitleAndSummary() {
    return (
        <Box
            display="flex"
            alignItems="start"
            justifyContent="space-between"
            mt="1"
            w="full"
        >
            <Box w="full" mr="7">
                <Heading fontSize="xl" w="full">
                    My fisrt blog title
                </Heading>
                <Text mt="2" w="full" whiteSpace={"wrap"}>
                    This is an article's summary. This is an article's summary.
                    This is an article's summary. This is an summary.
                </Text>
            </Box>
            <Image src="/hero.jpg" alt="thumbnail" w="150px" h="full" />
        </Box>
    );
}
