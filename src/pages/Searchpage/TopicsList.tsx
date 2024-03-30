import { useState, useEffect } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { searchTags } from "../../api/articles";
import { useSearchParams } from "react-router-dom";

export default function TopicsList() {
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [sp, setSp] = useSearchParams();
    const query = sp.get("query");

    useEffect(() => {
        if (!query) return;
        searchTags(query)
            .then((resp) => {
                if (resp.error) {
                    return setErr(resp.error);
                }
                setTags(resp.data);
            })
            .finally(() => setLoading(false));
    }, [query]);

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
