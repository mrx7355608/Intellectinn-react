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

// Api functions
import { createArticle } from "../api/articles";
import { useNavigate } from "react-router-dom";
import useCustomToast from "../hooks/useCustomToast";
import ArticlePublishStatus from "../components/write-page/ArticlePublishStatus";

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
        is_published: true,
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

            {/* Summary textarea */}
            <Text color="gray.800" mb={1}>
                Summary:
            </Text>
            <Textarea
                variant={"flushed"}
                size="lg"
                fontSize={"xl"}
                rows={3}
                mb={12}
                resize={"none"}
                onChange={onChangeHandler}
                name="summary"
            ></Textarea>

            {/* WYSIWYG editor */}
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={setEditorState}
                editorStyle={{
                    border: "2px solid #eee",
                    height: "250px",
                }}
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

            {/* Select thumbnail */}
            <ThumbnailSelector setArticleData={setArticleData as any} />

            {/* Article status */}
            <Text color="gray.800" mt="7" mb={2}>
                Select article status:
            </Text>
            <ArticlePublishStatus setArticleData={setArticleData as any} />

            {/* Error messages */}
            <Text color="red.500" mt="8">
                {error}
            </Text>

            {/* Action buttons */}
            <PublishButton
                isLoading={isLoading.isPublishing}
                publish={publish}
            />
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
