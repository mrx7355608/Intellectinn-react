import React from "react";
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
    Textarea,
    Spinner,
    Text,
} from "@chakra-ui/react";
import { updateUser } from "../../api/user";
import { useAuth } from "../../context/auth";
import useCustomToast from "../../hooks/useCustomToast";

export default function AboutModal() {
    const { user, updateAbout } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { showSuccessToast } = useCustomToast();

    const [about, setAbout] = React.useState(user?.about || "");
    const [err, setErr] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    return (
        <>
            <Button
                mt="7"
                rounded="full"
                px="6"
                borderColor="gray.800"
                variant="outline"
                size="sm"
                onClick={onOpen}
                isLoading={loading}
                disabled={loading}
            >
                Edit
            </Button>
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update about section</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Textarea
                            resize="none"
                            rows={12}
                            onChange={onChangeHandler}
                            value={about}
                        />
                        <Text color="red.600" mt="2">
                            {err}
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            px="4"
                            colorScheme="teal"
                            mr={3}
                            onClick={update}
                        >
                            {loading ? <Spinner size="sm" /> : "Update"}
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );

    function onChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setAbout(e.target.value);
    }

    async function update() {
        setLoading(true);
        try {
            const { data, error } = await updateUser({ about });
            if (error) {
                return setErr(error);
            }

            updateAbout(data.about); // Update user state in zustand store
            showSuccessToast("About section updated successfully");
        } catch (err) {
            setErr("Internal server error");
        } finally {
            setLoading(false);
        }
    }
}
