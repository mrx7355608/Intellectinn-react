// UI imports
import { lazy, Suspense, useState, useRef } from "react";
import { Editor as TinyEditor } from "tinymce";
import {
    Box,
    Input,
    Spinner,
    Textarea,
    Text,
    useToast,
} from "@chakra-ui/react";

// Components
import ThumbnailSelector from "./ThumbnailSelector";
import TagInput from "./TagInput";
import PublishButton from "./PublishButton";
import SaveAsDraftButton from "./SaveAsDraftButton";
const TinymceEditor = lazy(() => import("./TinymceEditor"));

// Api functions
import { createArticle } from "../../api/articles";

export default function Writepage() {
    const editorRef = useRef<TinyEditor | null>(null);
    const toast = useToast({
        duration: 4000,
        isClosable: true,
    });

    // Api loading and error states
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState({
        isPublishing: false,
        isSavingAsDraft: false,
    });

    // Article data states
    const [tags, setTags] = useState<string[]>([]);
    const [articleData, setArticleData] = useState({
        title: "",
        summary: "",
        thumbnail: "",
        timeToReadInMinutes: 0,
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
                <TinymceEditor ref={editorRef} />
            </Suspense>

            {/* Tags */}
            <Text color="gray.800" mt="12">
                Tags:
            </Text>
            <TagInput tags={tags} setTags={setTags} />

            {/* Time to read */}
            <Text color="gray.800" mt="12">
                Time to read in minutes:
            </Text>
            <Input
                variant={"flushed"}
                fontSize={"xl"}
                onChange={onChangeHandler}
                name="timeToReadInMinutes"
            />

            {/* Summary textarea */}
            <Text color="gray.800" mt="12">
                Summary:
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
            <ThumbnailSelector setArticleData={setArticleData} />

            {/* Error messages */}
            <Text color="red.500" mt="8">
                {error}
            </Text>

            {/* Action buttons */}
            <Box
                display="flex"
                w="full"
                alignItems="center"
                justifyContent="center"
                mt="10"
                gap="8"
            >
                <SaveAsDraftButton />
                <PublishButton
                    isLoading={isLoading.isPublishing}
                    publish={publish}
                />
            </Box>
        </Box>
    );

    function onChangeHandler(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        const { name, value } = e.target;
        setArticleData({ ...articleData, [name]: value });
    }

    function createArticleObject() {
        const article = Object.assign({}, articleData, {
            tags,
            content: editorRef.current?.getContent() || "",
            is_published: true,
        });
        return article;
    }

    async function publish() {
        setError("");
        setIsLoading({ ...isLoading, isPublishing: true });

        try {
            const article = createArticleObject();
            console.log(article);
            const { error: err } = await createArticle(article);
            if (err) return setError(err);
            showSuccessToast("Article published successfully");
        } catch (err) {
            showErrorToast("Internal server error");
        } finally {
            setIsLoading({ ...isLoading, isPublishing: false });
        }
    }

    // TODO: move the below 2 functions in a separate file to use the globally
    function showSuccessToast(message: string) {
        toast({
            status: "success",
            description: message,
        });
    }

    function showErrorToast(message: string) {
        toast({
            status: "error",
            description: message,
        });
    }
}
