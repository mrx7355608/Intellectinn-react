import { Text } from "@chakra-ui/react";
import { useState } from "react";
import { deleteComment } from "../../api/comments";
import { useCommentsContext } from "../../context/comments";
import useCustomToast from "../../hooks/useCustomToast";

export default function DeleteCommentButton({
    commentID,
}: {
    commentID: string;
}) {
    const [loading, setLoading] = useState(false);
    const { setComments } = useCommentsContext();
    const { showErrorToast, showSuccessToast } = useCustomToast();

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
                return showErrorToast(error);
            }
            showSuccessToast("Comment deleted successfully");
            setComments((prevState) =>
                prevState.filter((comment) => comment._id !== commentID),
            );
            return;
        } catch (err) {
            showErrorToast("Internal server error");
        } finally {
            setLoading(false);
        }
    }
}
