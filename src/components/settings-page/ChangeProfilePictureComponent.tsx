import { useState, useRef } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    Text,
    useDisclosure,
    Spinner,
    Input,
    Image,
} from "@chakra-ui/react";
import { useAuth } from "../../context/auth";
import { uploadThumbnailToCloudinary } from "../../api/articles";
import { updateUser } from "../../api/user";
import useCustomToast from "../../hooks/useCustomToast";

export default function ChangeProfilePictureComponent() {
    const { user, updateProfilePicture } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { showSuccessToast, showErrorToast } = useCustomToast();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewURL, setPreviewURL] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    return (
        <>
            {/* Button to open modal */}
            <Box>
                <Text
                    onClick={onOpen}
                    cursor={"pointer"}
                    _hover={{ textDecoration: "underline" }}
                    as="span"
                >
                    Update Profile picture
                </Text>
                <Text fontSize="sm" color="gray.500">
                    Select a new profile picture
                </Text>
            </Box>

            {/* Modal */}
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update profile picture</ModalHeader>
                    <ModalCloseButton />

                    {/* Modal Body */}
                    <ModalBody>
                        <Input
                            type="file"
                            display="none"
                            ref={fileInputRef}
                            onChange={onChangeHandler}
                        />

                        {/* Image preview */}
                        {previewURL ? (
                            // Show preview of newly selected image
                            <Image
                                objectFit={"cover"}
                                w="150px"
                                h="150px"
                                mx="auto"
                                rounded="full"
                                src={previewURL}
                            />
                        ) : (
                            // Otherwise, show old propfile picture
                            <Image
                                objectFit={"cover"}
                                w="150px"
                                h="150px"
                                mx="auto"
                                rounded="full"
                                src={user?.profilePicture}
                            />
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={onClickHandler}
                            colorScheme="pink"
                            mr={3}
                        >
                            Select
                        </Button>
                        <Button colorScheme="teal" mr={3} onClick={update}>
                            {isUploading ? <Spinner /> : "Update"}
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );

    function onClickHandler() {
        fileInputRef.current?.click();
    }

    function validateFile(file: File | undefined) {
        if (!file) {
            return "No image selected";
        }
        const splittedFileName = file.name.split(".");
        const extension =
            splittedFileName[splittedFileName.length - 1].toLowerCase();
        if (
            extension !== "jpg" &&
            extension !== "png" &&
            extension !== "jpeg"
        ) {
            return "Only jpg, png and jpeg image formats are allowed";
        }
        const sizeLimitMb = 2000000; // 2 MB
        if (file.size > sizeLimitMb) {
            return "Image size should be less than 2 MB";
        }

        return null;
    }

    function onChangeHandler() {
        const file = fileInputRef.current?.files![0];
        const error = validateFile(file);
        if (error) {
            return showErrorToast(error);
        }
        const url = URL.createObjectURL(file!);
        setPreviewURL(url);
    }

    async function update() {
        setIsUploading(true);
        try {
            // First, upload picture to cloudinary
            const file = fileInputRef.current?.files![0];
            const response = await uploadThumbnailToCloudinary(file!);

            // Secondly, make request to your server with
            // cloudinary provided url, to update it in
            // your database
            const profilePictureURL = response.data.secure_url;
            const { data, error } = await updateUser({
                profilePicture: profilePictureURL,
            });

            if (error) {
                return showErrorToast(error);
            }

            updateProfilePicture(data.profilePicture); // update user state
            showSuccessToast("Profile picture updated successfully");
        } catch (err) {
            showErrorToast(
                "There was an error while updating your profile picture",
            );
        } finally {
            setIsUploading(false);
        }
    }
}
