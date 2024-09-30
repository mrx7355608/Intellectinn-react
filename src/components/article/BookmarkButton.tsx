import { useState } from "react"
import { addBookmark, removeBookmark } from "../../api/articles";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useToast, Button } from "@chakra-ui/react"
import { IArticle } from "../../types/articles";
import { useAuth } from "../../context/auth";

export default function BookmarkButton({ article }: {
    article: IArticle
}) {
    const { user } = useAuth();
    const [bookmarks, setBookmarks] = useState(article.bookmarkedBy);
    const [loading, setLoading] = useState(false);
    const toast = useToast({
        isClosable: true,
        duration: 4000,
    });

    return (
        <Button 
            bg="transparent"
            _hover={{ bg: "transparent" }} 
            ml="auto"
            isLoading={loading}
            disabled={loading}
        >
            {user && bookmarks.includes(user._id) ? (
                <FaBookmark onClick={deleteBookmark} />
            ) : (
                <FaRegBookmark onClick={createBookmark} />
            )}
        </Button>
    )

    async function createBookmark() {
        try {
            setLoading(true);
            const { data, error } = await addBookmark(article._id);
            if (error) {
                return toast({ status: "error", description: error });
            }
            setBookmarks(data);
        } catch (err) {
            toast({ status: "error", description: "Internal server error" });
        } finally {
            setLoading(false);
        }
    }
    async function deleteBookmark() {
        try {
            setLoading(true);
            const { data, error } = await removeBookmark(article._id);
            if (error) {
                return toast({ status: "error", description: error });
            }
            setBookmarks(data);
        } catch (err) {
            toast({ status: "error", description: "Internal server error" });
        } finally {
            setLoading(false);
        }
    }
}
