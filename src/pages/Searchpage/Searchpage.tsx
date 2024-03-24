import { useSearchParams } from "react-router-dom";
import { Heading, Box, Divider } from "@chakra-ui/react";
import ArticlesList from "../../components/Articles/ArticlesList";

export default function Searchpage() {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <Box mt="12" p="12" w="70vw" mx="auto">
            <Heading display={"inline"} color={"#2d2d2d"}>
                Results for
            </Heading>
            <Heading display={"inline"}> {searchParams.get("query")}</Heading>
            <Divider mt="8" mb="7" />
            <ArticlesList />
        </Box>
    );
}
