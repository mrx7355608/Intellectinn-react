import { useCommentsContext } from "../../../context/comments";
import CommentCard from "./CommentCard";
import { Box } from "@chakra-ui/react";

export default function CommentsList() {
    const { comments } = useCommentsContext();

    return (
        <Box display={"flex"} flexDir={"column"} my="12" p="3" w="full">
            {comments.map((comment) => (
                <CommentCard key={comment._id} comment={comment} />
            ))}
        </Box>
    );
}
