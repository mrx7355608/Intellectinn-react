import { Button } from "@chakra-ui/react";

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
            px="5"
            w="full"
            size="lg"
            mt={7}
            onClick={publish}
            isLoading={isLoading}
            disabled={isLoading}
            _hover={{
                bg: "gray.900",
                color: "white",
            }}
        >
            Create article
        </Button>
    );
}
