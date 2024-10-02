import { FaPlus } from "react-icons/fa6";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,
    Heading,
    Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { updateUser } from "../../api/user";
import { useAuth } from "../../context/auth";
import useCustomToast from "../../hooks/useCustomToast";

export default function InterestsModal() {
    const { user } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    // eslint-disable-next-line
    const [interests, _setInterests] = useState([
        "Web development",
        "Software Engineering",
        "Software development",
        "Politics",
        "Economy",
        "Psychology",
        "Computer Science",
        "Apex legends",
        "Counter Strike 2",
        "Literatue",
        "Reading",
        "Poetry",
    ]);
    const [selectedInterests, setSelectedInterests] = useState<string[]>(
        user!.topicsInterestedIn,
    );
    const [loading, setLoading] = useState(false);
    const { showErrorToast, showSuccessToast } = useCustomToast();

    return (
        <>
            <Button size="sm" bg="transparent" w="ful" onClick={onOpen}>
                <FaPlus />
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                motionPreset="slideInBottom"
                size={"xl"}
                closeOnOverlayClick={false}
                closeOnEsc={false}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <Heading textAlign="center" mt="8" fontSize={"2xl"}>
                            Select your interests
                        </Heading>
                        <Box display="flex" gap="2" flexWrap="wrap" my="12">
                            {interests.map((i) => {
                                return selectedInterests?.includes(i) ? (
                                    <Button
                                        variant={"outline"}
                                        rounded="full"
                                        color="white"
                                        borderColor={"black"}
                                        bg="black"
                                        key={i}
                                        onClick={() => removeInterest(i)}
                                        _hover={{
                                            bg: "black",
                                            color: "white",
                                        }}
                                    >
                                        {i}
                                    </Button>
                                ) : (
                                    <Button
                                        variant={"outline"}
                                        rounded="full"
                                        color="black"
                                        borderColor={"black"}
                                        key={i}
                                        onClick={() => addInterest(i)}
                                    >
                                        {i}
                                    </Button>
                                );
                            })}
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        {loading ? (
                            <Button colorScheme="teal" mr={3}>
                                <Spinner />
                            </Button>
                        ) : (
                            <Button
                                colorScheme="teal"
                                mr={3}
                                onClick={updateInterests}
                            >
                                Update
                            </Button>
                        )}
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );

    function addInterest(interest: string) {
        setSelectedInterests([...selectedInterests, interest]);
    }
    function removeInterest(interest: string) {
        setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    }

    async function updateInterests() {
        try {
            setLoading(true);
            const { data, error } = await updateUser({
                topicsInterestedIn: selectedInterests,
            });
            if (error) {
                return showErrorToast(error);
            }
            setSelectedInterests(data.topicsInterestedIn);
            setUser({
                ...user!,
                topicsInterestedIn: data.topicsInterestedIn,
            });
            showSuccessToast("Interests updated successfully");
            onClose();
        } catch (err) {
            showErrorToast("Internal server error");
        } finally {
            setLoading(false);
        }
    }
}
