import { Button, Image } from "@chakra-ui/react";

export default function ContinueWithGoogle() {
    const onClickHandler = () => {
        window.open("/api/auth/google", "_self");
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
