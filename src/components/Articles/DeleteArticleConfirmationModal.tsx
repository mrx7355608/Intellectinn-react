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
    useToast,
} from "@chakra-ui/react";
import { deleteArticle } from "../../api/articles";
import { useState } from "react";

export default function DeleteArticleConfirmationModal({
    articleID,
    filterArticle,
}: {
    articleID: string;
    filterArticle: (id: string) => void;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const toast = useToast({
        isClosable: true,
        duration: 4000,
    });

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

    function showSuccessToast(message: string) {
        toast({
            description: message,
            status: "success",
        });
    }
    function showErrorToast(message: string) {
        toast({
            description: message,
            status: "error",
        });
    }
}
