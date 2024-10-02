import { Button, Text } from "@chakra-ui/react";
import { BiSolidLike, BiLike } from "react-icons/bi";
import { IArticle } from "../../../types/articles";
import { useAuth } from "../../../context/auth";
import { useState } from "react";
import { likeArticle, unlikeArticle } from "../../../api/articles";
import useCustomToast from "../../../hooks/useCustomToast";

export default function LikeButton({ article }: { article: IArticle }) {
    const [likes, setLikes] = useState(article.likes);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const { showErrorToast } = useCustomToast();

    return (
        <Button
            bg="transparent"
            _hover={{ bg: "transparent" }}
            ml="auto"
            isLoading={loading}
            disabled={loading}
        >
            {user && likes.includes(user._id) ? (
                <BiSolidLike size={22} onClick={unlike} />
            ) : (
                <BiLike size={22} onClick={like} />
            )}
            <Text ml="2">{likes.length}</Text>
        </Button>
    );

    async function like() {
        try {
            setLoading(true);
            const { data, error } = await likeArticle(article._id);
            if (error) {
                return showErrorToast(error);
            }
            setLikes(data);
        } catch (err) {
            showErrorToast("Internal server error");
        } finally {
            setLoading(false);
        }
    }

    async function unlike() {
        try {
            setLoading(true);
            const { data, error } = await unlikeArticle(article._id);
            if (error) {
                return showErrorToast(error);
            }
            setLikes(data);
        } catch (err) {
            showErrorToast("Internal server error");
        } finally {
            setLoading(false);
        }
    }
}
