import { Box, Button, Input, Text } from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import { RxCross1 } from "react-icons/rx";

interface ITagInputProps {
    tags: string[];
    setTags: React.Dispatch<SetStateAction<string[]>>;
}

export default function TagInput({ tags, setTags }: ITagInputProps) {
    const [inputValue, setInputValue] = useState<string>("");

    return (
        <Box w="full" mt="3">
            <Box display="flex" gap="1" flexWrap="wrap" mb="2">
                {tags.map((t) => {
                    return (
                        <Box
                            display="flex"
                            gap="1"
                            justifyContent={"space-between"}
                            alignItems="center"
                            bg="gray.100"
                            rounded="full"
                            py="1"
                            px="3"
                        >
                            <Text as="span">{t}</Text>
                            <Button
                                size="xs"
                                onClick={() => removeTag(t)}
                                p="0"
                                m="0"
                            >
                                <RxCross1 size={13} />
                            </Button>
                        </Box>
                    );
                })}
            </Box>
            <Input
                w="full"
                variant="flushed"
                onKeyDown={onKeyDownHandler}
                onChange={onChangeHandler}
                placeholder="Enter tag and press enter"
                value={inputValue}
            />
        </Box>
    );

    // Removes a tag from tags state array
    function removeTag(tagToRemove: string) {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    }

    // Adds the input box value into the tags state array
    function onKeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter" && inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    }

    // Updates the value of input box
    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
    }
}
