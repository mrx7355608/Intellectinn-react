import Article from "./Article";
import { Box } from "@chakra-ui/react";

export default function ArticlesList({ tag }: { tag: string }) {
    return (
        <Box display="flex" flexDirection="column" gap={"8"}>
            <Article />
            <Article />
            <Article />
            <Article />
            <Article />
        </Box>
    );
}
