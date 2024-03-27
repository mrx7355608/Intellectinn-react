import { lazy, Suspense, useState } from "react";
import { Box, Input, Button, Spinner, Textarea, Text } from "@chakra-ui/react";
const TinymceEditor = lazy(() => import("./TinymceEditor"));
import ThumbnailSelector from "./ThumbnailSelector";
import TagInput from "./TagInput";

export default function Writepage() {
    const [tags, setTags] = useState<string[]>([]);
    const [articleData, setArticleData] = useState({
        title: "",
        summary: "",
        content: "",
    });

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
            {/* Title input */}
            <Input
                size={"lg"}
                variant={"flushed"}
                placeholder="Title"
                fontSize={"2xl"}
                mb="14"
                onChange={onChangeHandler}
                name="title"
            />

            {/* Tinymce editor */}
            <Suspense fallback={<Spinner />}>
                <TinymceEditor />
            </Suspense>

            {/* Tags */}
            <Text color="gray.500" mt="12">
                Tag
            </Text>
            <TagInput tags={tags} setTags={setTags} />

            {/* Summary textarea */}
            <Text color="gray.500" mt="12">
                Summary
            </Text>
            <Textarea
                variant={"flushed"}
                size="lg"
                fontSize={"xl"}
                rows={2}
                onChange={onChangeHandler}
                name="summary"
            ></Textarea>

            {/* Select thumbnail */}
            <ThumbnailSelector />

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
                    bg="gray.800"
                    color="white"
                    rounded="full"
                    flex="1"
                    px="5"
                    size="lg"
                    onClick={publish}
                    _hover={{
                        bg: "gray.900",
                        color: "white",
                    }}
                >
                    Publish
                </Button>
            </Box>
        </Box>
    );

    function onChangeHandler(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        const { name, value } = e.target;
        setArticleData({ ...articleData, [name]: value });
    }

    function publish() {
        const data = Object.assign({}, articleData, { tags });
        console.log(data);
    }
}
