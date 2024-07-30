import { Box, Spinner, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export default function TopicsList() {
    const [sp, setSp] = useSearchParams();
    const query = sp.get("query");
    const {
        loading,
        err,
        data: tags,
    } = useFetch<string>(`/api/articles/search/tags?tags=${query}`);

    return (
        <Box display="flex" flexWrap="wrap" gap="2">
            {loading ? (
                <Spinner />
            ) : err ? (
                <Text color="red.600">{err}</Text>
            ) : (
                tags.map((t) => {
                    return (
                        <Text
                            rounded="full"
                            bg="gray.100"
                            px="5"
                            py="2"
                            color="gray.600"
                            fontSize="sm"
                            fontWeight={"medium"}
                        >
                            {t}
                        </Text>
                    );
                })
            )}
        </Box>
    );
}
