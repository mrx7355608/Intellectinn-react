import { Button, Image } from "@chakra-ui/react";

export default function ContinueWithGoogle() {
    return (
        <Button
            w={"full"}
            pos={"relative"}
            bg={"transparent"}
            p={"6"}
            variant="outline"
            color={"gray.600"}
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
