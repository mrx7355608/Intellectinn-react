import { Box, Text, Input, Image } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { FaCamera } from "react-icons/fa";

export default function ThumbnailSelector() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewURL, setPreviewURL] = useState("");
    return (
        <Box w="full" mt="12">
            <Box w="full" p="8" rounded="lg" bg="gray.50" mb="6">
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

    function onChangeHandler() {
        const file = fileInputRef.current?.files![0];
        const url = URL.createObjectURL(file!);
        setPreviewURL(url);
    }
}
