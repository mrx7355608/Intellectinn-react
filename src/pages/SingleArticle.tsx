import "./custom.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Text, Box, Image, Heading, Divider } from "@chakra-ui/react";
import Parser from "react-html-parser";
import axiosAgent from "../api/utils";
import { IApiResponse } from "../types/api";
import { IArticle } from "../types/articles";
import Prism from "prismjs";
import "prismjs/themes/prism-solarizedlight.css";
import "prismjs/components/prism-java";
import ArticleAuthorInfo from "../components/article/ArticleAuthorInfo";
import ArticleActionButtons from "../components/article/ArticleActionButtons";
import CommentsSection from "../components/comments/CommentsSection";
import CommentsProvider from "../context/comments";

export default function SingleArticle() {
    const { slug } = useParams();
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [article, setArticle] = useState<IArticle>();

    useEffect(() => {
        axiosAgent
            .get<IApiResponse<IArticle>>(`/api/articles/${slug}`)
            .then((axiosResponse) => axiosResponse.data)
            .then((resp) => {
                if (resp.error) {
                    setErr(resp.error);
                } else {
                    setArticle(resp.data);
                }
            })
            .catch(() => setErr("Internal server error"))
            .finally(() => setLoading(false));
    }, [slug]);

    return (
        <Box
            w="60vw"
            mx="auto"
            display="flex"
            alignItems={"start"}
            justifyContent={"start"}
            flexDir={"column"}
            mt="16"
            pt="14"
            minH="100vh"
        >
            {loading ? (
                <Spinner mx="auto" />
            ) : err ? (
                <Text fontSize={"xl"} fontWeight={"medium"} color="red.600">
                    {err}
                </Text>
            ) : (
                article && <Article article={article} />
            )}
        </Box>
    );
}

function Article({ article }: { article: IArticle }) {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <>
            <Heading fontSize="4xl" fontWeight={"black"}>
                {article.title}
            </Heading>
            <ArticleAuthorInfo article={article} />

            <Divider mt="8" mb="2" />
            <ArticleActionButtons article={article} />
            <Divider mb="10" mt="2" />

            {/* Article content starts here */}
            {/* Thumbnail */}
            <Image
                src={article.thumbnail}
                rounded="md"
                objectFit={"cover"}
                w="full"
                h="auto"
                mb="9"
            />
            {/* TinyMCE content */}
            <div className="container">{Parser(article.content)}</div>

            {/* Tags */}
            <Box
                display="flex"
                alignItems={"center"}
                justifyContent={"start"}
                flexWrap={"wrap"}
                gap="2"
                mt="10"
            >
                {article.tags.map((t) => {
                    return (
                        <Text
                            bg="gray.100"
                            py="2"
                            rounded="full"
                            px="5"
                            color="gray.600"
                        >
                            {t}
                        </Text>
                    );
                })}
            </Box>
            <Divider my="10" />
            <CommentsProvider>
                <CommentsSection article={article} />
            </CommentsProvider>
        </>
    );
}
