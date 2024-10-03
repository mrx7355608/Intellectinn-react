import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Box, Spinner, Text } from "@chakra-ui/react";
// Components
import ArticlesList from "../article/ArticlesList";
import About from "./About";
import UserList from "../users/UserList";
// Types
import { IArticle } from "../../types/articles";
import { IUser } from "../../types/user";

export default function SubProfilePage() {
    const { type, id } = useParams();
    const { loading, err, data } = useFetch<unknown[]>(
        `/api/users/${id}/${type}`,
    );

    return (
        <Box display="flex" flexDirection={"column"}>
            {loading && <Spinner />}
            {err && <Text color="red.600">{err}</Text>}
            {!loading && !err && data && <DataList type={type!} data={data} />}
        </Box>
    );
}

function DataList({ type, data }: { type: string; data: unknown[] }) {
    return (
        <>
            {type === "bookmarks" || type === "publications" ? (
                <ArticlesList articles={data as IArticle[]} /> // Publications OR Bookmarks of user
            ) : type === "about" ? (
                <About />
            ) : (
                <UserList users={data as IUser[]} /> // TODO: updated it's name to FollowersList
            )}
        </>
    );
}
