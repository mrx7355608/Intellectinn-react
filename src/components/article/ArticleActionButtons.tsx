import { Spinner, Box, Button, Text, useToast } from "@chakra-ui/react";
import { FaRegBookmark, FaBookmark, FaRegComment } from "react-icons/fa";
import { BiSolidLike, BiLike } from "react-icons/bi";
import { useState } from "react";
import { IArticle } from "../../types/articles";
import {
    addBookmark,
    likeArticle,
    removeBookmark,
    unlikeArticle,
} from "../../api/articles";
import { useAuth } from "../../context/auth";

export default function ArticleActionButtons({
    article,
}: {
    article: IArticle;
}) {
    const { user } = useAuth();
    const [likes, setLikes] = useState(article.likes);
    const [bookmarks, setBookmarks] = useState(article.bookmarkedBy);
    const [loading, setLoading] = useState({
        isLiking: false,
        isBookmarking: false,
    });
    const toast = useToast({
        isClosable: true,
        duration: 4000,
    });

    return (
        <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
            w="full"
        >
            <Box>
                {/* Likes button */}
                <Button
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                    ml="auto"
                >
                    {loading.isLiking ? (
                        <Spinner size="md" />
                    ) : user && likes.includes(user._id) ? (
                        <BiSolidLike size={22} onClick={unlike} />
                    ) : (
                        <BiLike size={22} onClick={like} />
                    )}
                    <Text ml="2">{likes.length}</Text>
                </Button>
                {/* Comments button */}
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
            <Button bg="transparent" _hover={{ bg: "transparent" }} ml="auto">
                {loading.isBookmarking ? (
                    <Spinner size="md" />
                ) : user && bookmarks.includes(user._id) ? (
                    <FaBookmark size={18} onClick={deleteBookmark} />
                ) : (
                    <FaRegBookmark size={18} onClick={createBookmark} />
                )}
                <Text ml="2">{bookmarks.length}</Text>
            </Button>
        </Box>
    );

    async function like() {
        try {
            setLoading({ ...loading, isLiking: true });
            const { data, error } = await likeArticle(article._id);
            if (error) {
                return toast({ status: "error", description: error });
            }
            setLikes(data);
        } catch (err) {
            toast({ status: "error", description: "Internal server error" });
        } finally {
            setLoading({ ...loading, isLiking: false });
        }
    }

    async function unlike() {
        try {
            setLoading({ ...loading, isLiking: true });
            const { data, error } = await unlikeArticle(article._id);
            if (error) {
                return toast({ status: "error", description: error });
            }
            setLikes(data);
        } catch (err) {
            toast({ status: "error", description: "Internal server error" });
        } finally {
            setLoading({ ...loading, isLiking: false });
        }
    }

    async function createBookmark() {
        try {
            setLoading({ ...loading, isBookmarking: true });
            const { data, error } = await addBookmark(article._id);
            if (error) {
                return toast({ status: "error", description: error });
            }
            setBookmarks(data);
        } catch (err) {
            toast({ status: "error", description: "Internal server error" });
        } finally {
            setLoading({ ...loading, isBookmarking: false });
        }
    }
    async function deleteBookmark() {
        try {
            setLoading({ ...loading, isBookmarking: true });
            const { data, error } = await removeBookmark(article._id);
            if (error) {
                return toast({ status: "error", description: error });
            }
            setBookmarks(data);
        } catch (err) {
            toast({ status: "error", description: "Internal server error" });
        } finally {
            setLoading({ ...loading, isBookmarking: false });
        }
    }
}
