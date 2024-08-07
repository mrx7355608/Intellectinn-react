import {
    Spinner,
    Button,
    Box,
    Textarea,
    Image,
    useToast,
} from "@chakra-ui/react";
import { useAuthContext } from "../../context/auth";
import React, { useState } from "react";
import { postComment } from "../../api/comments";
import { IArticle } from "../../types/articles";
import { useCommentsContext } from "../../context/comments";

export default function InputComment({ article }: { article: IArticle }) {
    const { user } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [commentText, setCommentText] = useState("");
    const toast = useToast({
        isClosable: true,
        duration: 4000,
    });
    const { setComments } = useCommentsContext();

    return (
        <Box
            w="full"
            display="flex"
            justifyContent={"end"}
            alignItems={"end"}
            p="3"
            gap="4"
        >
            <Image
                src={user?.profilePicture}
                rounded="full"
                objectFit={"cover"}
                w="50px"
                h="50px"
                mb="auto"
            />
            <Textarea
                rows={3}
                variant={"flushed"}
                resize="none"
                h={"full"}
                onChange={onChangeHandler}
            ></Textarea>
            {loading ? (
                <Button
                    colorScheme="teal"
                    rounded="full"
                    px="6"
                    size={"sm"}
                    ml="full"
                    minW="85px"
                >
                    <Spinner size="sm" />
                </Button>
            ) : (
                <Button
                    colorScheme="teal"
                    rounded="full"
                    px="6"
                    size={"sm"}
                    ml="full"
                    onClick={comment}
                    minW="85px"
                >
                    Post
                </Button>
            )}
        </Box>
    );

    function onChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setCommentText(e.target.value);
    }

    async function comment() {
        if (!commentText.trim()) {
            return;
        }
        try {
            setLoading(true);
            const { data: newlyCreatedComment, error } = await postComment(
                commentText,
                article._id,
            );
            if (error) {
                return toast({
                    description: error,
                    status: "warning",
                });
            }
            setComments((prevState) => [newlyCreatedComment, ...prevState]);
        } catch (err) {
            toast({
                status: "error",
                description: "Internal server error",
            });
        } finally {
            setLoading(false);
        }
    }
}
