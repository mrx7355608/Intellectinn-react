import { Button } from "@chakra-ui/react";

type IFormSubmitButtonProps = {
    buttonText: string;
    isLoading: boolean;
};

export default function FormSubmitButton({
    buttonText,
    isLoading,
}: IFormSubmitButtonProps) {
    return (
        <Button
            colorScheme="teal"
            type="submit"
            w="full"
            mt={"5"}
            isLoading={isLoading}
            disabled={isLoading}
        >
            {buttonText}
        </Button>
    );
}
