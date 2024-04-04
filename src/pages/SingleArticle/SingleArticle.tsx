import "./custom.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Button,
    Spinner,
    Text,
    Box,
    Image,
    Heading,
    Divider,
} from "@chakra-ui/react";
import { FaRegBookmark, FaRegComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import Parser from "react-html-parser";

import axiosAgent from "../../api/utils";
import { IApiResponse } from "../../types/api";
import { IArticle } from "../../types/articles";
import FollowAndUnfollowButtons from "./FollowAndUnfollowButtons";
import Prism from "prismjs";
import "prismjs/themes/prism-solarizedlight.css";
import "prismjs/components/prism-java";

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
            <Box
                display="flex"
                w="full"
                justifyContent={"start"}
                mt="10"
                gap="4"
            >
                <Image
                    src={article.author.profilePicture}
                    rounded="full"
                    objectFit={"cover"}
                    w="55px"
                    h="55px"
                />
                <Box>
                    <Text fontSize="md" fontWeight={"medium"}>
                        {article.author.fullname}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                        {article.timeToReadInMinutes} min read &middot;{" "}
                        {new Date(article.createdAt).toDateString()}
                    </Text>
                </Box>
                <FollowAndUnfollowButtons authorID={article.author._id} />
            </Box>

            <Divider mt="8" mb="2" />

            {/* Like Comment and Bookmark button */}
            <Box
                display="flex"
                justifyContent={"space-between"}
                alignItems={"center"}
                w="full"
            >
                <Box>
                    <Button
                        bg="transparent"
                        _hover={{ bg: "transparent" }}
                        ml="auto"
                        color="gray.500"
                    >
                        <BiLike size={22} color="inherit" />
                        <Text ml="1">10</Text>
                    </Button>
                    <Button
                        bg="transparent"
                        _hover={{ bg: "transparent" }}
                        ml="auto"
                        color="gray.500"
                    >
                        <FaRegComment size={20} color="inherit" />
                        <Text ml="1" color="gray.500">
                            2
                        </Text>
                    </Button>
                </Box>
                {/* Bookmark button */}
                <Button
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                    ml="auto"
                    color="gray.500"
                >
                    <FaRegBookmark size={18} color="inherit" />
                </Button>
            </Box>
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
        </>
    );
}
