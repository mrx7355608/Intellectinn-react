import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { IArticle } from "../../types/articles";
import { addBookmark, removeBookmark } from "../../api/articles";
import { useAuth } from "../../context/auth";
import useCustomToast from "../../hooks/useCustomToast";

export default function BookmarkButton({ article }: { article: IArticle }) {
    const { user } = useAuth();
    const [bookmarks, setBookmarks] = useState(article.bookmarkedBy);
    const [loading, setLoading] = useState(false);
    const { showErrorToast } = useCustomToast();

    return (
        <Button
            bg="transparent"
            _hover={{ bg: "transparent" }}
            ml="auto"
            isLoading={loading}
            disabled={loading}
            padding={0}
        >
            {user && bookmarks.includes(user._id) ? (
                <FaBookmark onClick={deleteBookmark} />
            ) : (
                <FaRegBookmark onClick={createBookmark} />
            )}
        </Button>
    );

    async function createBookmark() {
        try {
            setLoading(true);
            const { data, error } = await addBookmark(article._id);
            if (error) {
                return showErrorToast(error);
            }
            setBookmarks(data);
        } catch (err) {
            showErrorToast("Internal server error");
        } finally {
            setLoading(false);
        }
    }
    async function deleteBookmark() {
        try {
            setLoading(true);
            const { data, error } = await removeBookmark(article._id);
            if (error) {
                return showErrorToast(error);
            }
            setBookmarks(data);
        } catch (err) {
            showErrorToast("Internal server error");
        } finally {
            setLoading(false);
        }
    }
}
