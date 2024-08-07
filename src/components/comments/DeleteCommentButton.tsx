import { Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { deleteComment } from "../../api/comments";
import { useCommentsContext } from "../../context/comments";

export default function DeleteCommentButton({
    commentID,
}: {
    commentID: string;
}) {
    const [loading, setLoading] = useState(false);
    const { setComments } = useCommentsContext();
    const toast = useToast({
        isClosable: true,
        duration: 4000,
    });
    return (
        <>
            {loading ? (
                <Text
                    fontSize="sm"
                    as="span"
                    color="gray.500"
                    whiteSpace={"nowrap"}
                >
                    Deleting...
                </Text>
            ) : (
                <Text
                    fontSize="sm"
                    as="span"
                    color="gray.500"
                    whiteSpace={"nowrap"}
                    onClick={removeComment}
                    _hover={{
                        textDecor: "underline",
                        cursor: "pointer",
                    }}
                >
                    Delete
                </Text>
            )}
        </>
    );

    async function removeComment() {
        try {
            setLoading(true);
            const { error } = await deleteComment(commentID);
            if (error) {
                return toast({
                    description: error,
                    status: "error",
                });
            }
            toast({
                description: "Comment deleted successfully",
                status: "success",
            });
            setComments((prevState) =>
                prevState.filter((comment) => comment._id !== commentID),
            );
            return;
        } catch (err) {
            toast({
                description: "Internal server error",
                status: "error",
            });
        } finally {
            setLoading(false);
        }
    }
}
