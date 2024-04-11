// Responsible for fetching comments from server and
// updating comments context

import { useEffect } from "react";
import { IArticle, IComment } from "../../../types/articles";
import useFetch from "../../../hooks/useFetch";
import InputComment from "./InputComment";
import CommentsList from "./CommentsList";
import { Spinner, Text } from "@chakra-ui/react";
import { useCommentsContext } from "../../../context/comments";

export default function CommentsSection({ article }: { article: IArticle }) {
    const { setComments } = useCommentsContext();
    const { loading, err, data } = useFetch<IComment>(
        `/api/comments/${article._id}`
    );

    useEffect(() => {
        if (data) {
            setComments(data);
        }
    }, [data, setComments]);

    return (
        <>
            <InputComment article={article} />
            {loading ? (
                <Spinner />
            ) : err ? (
                <Text color="red.500">{err}</Text>
            ) : (
                <CommentsList />
            )}
        </>
    );
}
