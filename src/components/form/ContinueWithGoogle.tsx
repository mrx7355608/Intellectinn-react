import { Button, Image } from "@chakra-ui/react";

export default function ContinueWithGoogle() {
    const onClickHandler = () => {
        const serverPrefixedURL =
            import.meta.env.VITE_SERVER_URL + "/api/auth/google";

        const url =
            import.meta.env.VITE_ENV === "production"
                ? "/api/auth/google"
                : serverPrefixedURL;

        window.open(url, "_self");
    };
    return (
        <Button
            w={"full"}
            pos={"relative"}
            bg={"transparent"}
            p={"6"}
            variant="outline"
            onClick={onClickHandler}
        >
            <Image
                src="/google.png"
                alt="Google login button"
                objectFit="cover"
                borderRadius="full"
                w={"24px"}
                pos={"absolute"}
                top={"3"}
                left={"3"}
            />
            Continue With Google
        </Button>
    );
}
