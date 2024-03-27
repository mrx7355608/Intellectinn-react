import { Button } from "@chakra-ui/react";

export default function SaveAsDraftButton() {
    return (
        <Button
            variant="outline"
            rounded="full"
            px="5"
            size="lg"
            borderColor="gray.800"
            flex="1"
        >
            Save as draft
        </Button>
    );
}
