import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Text,
    Spinner,
} from "@chakra-ui/react";
import { deleteArticle } from "../../api/articles";
import { useState } from "react";
import { useArticles } from "../../context/articles";
import useCustomToast from "../../hooks/useCustomToast";

export default function DeleteArticleConfirmationModal({
    articleID,
}: {
    articleID: string;
}) {
    const [loading, setLoading] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { filterArticle } = useArticles();
    const { showSuccessToast, showErrorToast } = useCustomToast();

    return (
        <>
            <Text w="full" onClick={onOpen}>
                Delete
            </Text>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete article</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>
                            Are you sure you want to delete this article?
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={removeArticle}
                            colorScheme="red"
                            mr="2"
                        >
                            {loading ? <Spinner /> : "Delete"}
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );

    async function removeArticle() {
        setLoading(true);
        try {
            const { error } = await deleteArticle(articleID);
            if (error) {
                return showErrorToast(error);
            }

            filterArticle(articleID);
            return showSuccessToast("Article deleted successfully");
        } catch (err) {
            showErrorToast("Internal server error");
        } finally {
            setLoading(false);
        }
    }
}
