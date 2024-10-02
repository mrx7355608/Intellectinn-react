import { useToast } from "@chakra-ui/react";

export default function useCustomToast() {
    const toast = useToast({
        isClosable: true,
        duration: 5000,
        variant: "left-accent",
    });

    function showSuccessToast(message: string) {
        toast({
            description: message,
            status: "success",
        });
    }

    function showWarningToast(message: string) {
        toast({
            description: message,
            status: "warning",
        });
    }

    function showErrorToast(message: string) {
        toast({
            description: message,
            status: "error",
        });
    }

    function showInfoToast(message: string) {
        toast({
            description: message,
            status: "info",
        });
    }

    return {
        showInfoToast,
        showWarningToast,
        showSuccessToast,
        showErrorToast,
    };
}
