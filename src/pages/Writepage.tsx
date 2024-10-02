// UI imports
import { useState } from "react";
import { Box, Input, Textarea, Text } from "@chakra-ui/react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Components
import ThumbnailSelector from "../components/write-page/ThumbnailSelector";
import TagInput from "../components/write-page/TagInput";
import PublishButton from "../components/write-page/PublishButton";
// import SaveAsDraftButton from "../components/write-page/SaveAsDraftButton";

// Api functions
import { createArticle } from "../api/articles";
import { useNavigate } from "react-router-dom";
import useCustomToast from "../hooks/useCustomToast";

export default function Writepage() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const navTo = useNavigate();
    const { showErrorToast, showSuccessToast } = useCustomToast();

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
            {/* WYSIWYG editor */}
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={setEditorState}
            />

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
                {/* <SaveAsDraftButton /> */}
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
            content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            is_published: true,
        });
        return article;
    }

    async function publish() {
        setError("");
        setIsLoading({ ...isLoading, isPublishing: true });

        try {
            const article = createArticleObject();
            const { error: err } = await createArticle(article);
            if (err) return setError(err);
            showSuccessToast("Article published successfully");
            navTo("/user");
        } catch (err) {
            showErrorToast("Internal server error");
        } finally {
            setIsLoading({ ...isLoading, isPublishing: false });
        }
    }
}
