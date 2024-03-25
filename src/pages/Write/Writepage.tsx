import { lazy, Suspense } from "react";
import { Box, Input, Button, Spinner, Textarea, Text } from "@chakra-ui/react";
const TinymceEditor = lazy(() => import("./TinymceEditor"));

export default function Writepage() {
    return (
        <Box
            display={"flex"}
            alignItems={"start"}
            flexDir={"column"}
            justifyContent={"center"}
            maxW={"60vw"}
            minH={"100vh"}
            mx={"auto"}
            py={"12"}
            mt="16"
        >
            <Input
                size={"lg"}
                variant={"flushed"}
                placeholder="Title"
                fontSize={"2xl"}
                mb="14"
            />

            {/* Tinymce editor */}
            <Suspense fallback={<Spinner />}>
                <TinymceEditor />
            </Suspense>

            {/* Tag input box */}
            <Text mt="8" color="gray.500" mt="12">
                Tag
            </Text>
            <Input variant={"flushed"} size="md" fontSize={"xl"} />

            {/* Summary textarea */}
            <Text color="gray.500" mt="12">
                Summary
            </Text>
            <Textarea
                variant={"flushed"}
                size="lg"
                fontSize={"xl"}
                rows={2}
            ></Textarea>

            {/* Action buttons */}
            <Box
                display="flex"
                w="full"
                alignItems="center"
                justifyContent="center"
                mt="16"
                gap="8"
            >
                <Button
                    variant="outline"
                    rounded="full"
                    px="5"
                    size="lg"
                    borderColor="gray.800"
                    flex="1"
                >
                    Save as draft
                </Button>
                <Button
                    bg="gray.700"
                    color="white"
                    rounded="full"
                    flex="1"
                    px="5"
                    size="lg"
                >
                    Publish
                </Button>
            </Box>
        </Box>
    );
}
