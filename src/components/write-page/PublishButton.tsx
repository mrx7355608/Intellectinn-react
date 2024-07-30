import { Button, Spinner } from "@chakra-ui/react";

export default function PublishButton({
    isLoading,
    publish,
}: {
    isLoading: boolean;
    publish: () => void;
}) {
    return (
        <Button
            bg="gray.800"
            color="white"
            rounded="full"
            flex="1"
            px="5"
            size="lg"
            onClick={publish}
            _hover={{
                bg: "gray.900",
                color: "white",
            }}
        >
            {isLoading ? <Spinner /> : "Publish"}
        </Button>
    );
}
