import { Box, Text, Input, Image, Spinner, useToast } from "@chakra-ui/react";
import { useState, useRef, SetStateAction } from "react";
import { FaCamera } from "react-icons/fa";
import { uploadThumbnailToCloudinary } from "../../api/articles";

export default function ThumbnailSelector({
    setArticleData,
}: {
    setArticleData: React.Dispatch<SetStateAction<any>>;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewURL, setPreviewURL] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const toast = useToast({
        duration: 4000,
        isClosable: true,
    });

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

    async function onChangeHandler() {
        setIsUploading(true);
        const file = fileInputRef.current?.files![0];
        const url = URL.createObjectURL(file!);
        setPreviewURL(url);

        try {
            const response = await uploadThumbnailToCloudinary(file!);
            setArticleData((prev) => ({
                ...prev,
                thumbnail: response.data.secure_url,
            }));
            toast({
                status: "success",
                description: "Thumbnail uploaded successfully",
            });
        } catch (err) {
            toast({
                status: "error",
                description:
                    "There was an error while uploading your thumbnail",
            });
        } finally {
            setIsUploading(false);
        }
    }
}
