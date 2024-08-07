import { Box, Spinner, Text } from "@chakra-ui/react";
import useFetch from "../../hooks/useFetch";
import UserBox from "../write-page/UserBoxComponent";
import { IUser } from "../../types/user";
import { useParams } from "react-router-dom";
import ArticlesList from "../article/ArticlesList";
import { IArticle } from "../../types/articles";

export default function SubProfilePage() {
    const { type, id } = useParams();
    console.log({ type, id });
    const { loading, err, data } = useFetch<unknown>(
        `/api/users/${id}/${type}`,
    );

    return (
        <Box display="flex" flexDirection={"column"}>
            {loading ? (
                <Spinner />
            ) : err ? (
                <Text color="red.600">{err}</Text>
            ) : data.length < 1 ? (
                <Text>Nothing to show</Text>
            ) : (
                <DataList type={type!} data={data} />
            )}
        </Box>
    );
}

function DataList({ type, data }: { type: string; data: unknown[] }) {
    return (
        <>
            {type === "bookmarks" || type === "publications" ? (
                <ArticlesList articles={data as IArticle[]} />
            ) : null}
        </>
    );
}
