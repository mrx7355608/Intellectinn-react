import { Box, Text, Input, Image, Spinner } from "@chakra-ui/react";
import { useState, useRef, SetStateAction } from "react";
import { FaCamera } from "react-icons/fa";
import { uploadThumbnailToCloudinary } from "../../api/articles";
import { IArticle } from "../../types/articles";
import useCustomToast from "../../hooks/useCustomToast";

export default function ThumbnailSelector({
    setArticleData,
}: {
    setArticleData: React.Dispatch<SetStateAction<IArticle>>;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewURL, setPreviewURL] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const { showSuccessToast, showErrorToast } = useCustomToast();

    return (
        <Box w="full" mt="12">
            <Box w="full" p="8" rounded="lg" bg="gray.50" mb="6">
                {!isUploading ? (
                    // Upload button
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        rounded="full"
                        w="60px"
                        h="60px"
                        borderColor="gray.600"
                        border="1px"
                        mx="auto"
                        cursor="pointer"
                        onClick={onClickHandler}
                    >
                        <FaCamera size="20" />
                    </Box>
                ) : (
                    // Loading indicator
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        rounded="full"
                        w="60px"
                        h="60px"
                        borderColor="gray.600"
                        border="1px"
                        mx="auto"
                        cursor="pointer"
                    >
                        <Spinner />
                    </Box>
                )}
                <Text textAlign="center" mt="4">
                    Select a thumbnail
                </Text>
                <Input
                    type="file"
                    display="none"
                    ref={fileInputRef}
                    onChange={onChangeHandler}
                />
            </Box>
            {previewURL ? (
                <Image
                    objectFit={"cover"}
                    w="full"
                    src={previewURL}
                    rounded="lg"
                />
            ) : null}
        </Box>
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
        const sizeLimitMb = 5000000; // 5 MB
        if (file.size > sizeLimitMb) {
            return "Thumbnail size should be less than 5 MB";
        }

        return null;
    }

    async function onChangeHandler() {
        // setIsUploading(true);
        const file = fileInputRef.current?.files![0];
        const error = validateFile(file);
        if (error) {
            return showErrorToast(error);
        }
        const url = URL.createObjectURL(file!);
        setPreviewURL(url);

        try {
            const response = await uploadThumbnailToCloudinary(file!);
            setArticleData((prev: IArticle) => ({
                ...prev,
                thumbnail: response.data.secure_url,
            }));
            showSuccessToast("Thumbnail uploaded successfully");
        } catch (err) {
            showErrorToast("There was an error while uploading your thumbnail");
        } finally {
            setIsUploading(false);
        }
    }
}
