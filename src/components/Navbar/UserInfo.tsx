import { Box, Text, Image, Button, Spinner, useToast } from "@chakra-ui/react";
import { useAuthContext } from "../../context/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../api/auth";

export default function UserInfo() {
    const { user, setUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast({
        isClosable: true,
        duration: 4000,
    });

    return (
        <Box display="flex" gap="5" alignItems="center">
            <Link to="/user">
                <Text
                    fontSize="sm"
                    fontWeight="medium"
                    _hover={{
                        textDecoration: "underline",
                        cursor: "pointer",
                    }}
                >
                    {user?.fullname}
                </Text>
            </Link>
            <Image
                src={user?.profilePicture}
                alt="user profile picture"
                w="40px"
                h="40px"
                objectFit="cover"
                rounded="full"
            />
            <Button
                variant="outline"
                px="5"
                borderColor="gray.800"
                size="sm"
                rounded="full"
                onClick={onClickHandler}
                minW="70px"
            >
                {isLoading ? <Spinner size="sm" /> : "Logout"}
            </Button>
        </Box>
    );

    async function onClickHandler() {
        setIsLoading(true);
        try {
            const { error } = await logout();
            if (error) {
                return toast({
                    status: "error",
                    description: error,
                });
            }

            // Show success toast
            toast({
                status: "success",
                description: "Logout successful",
            });
            setUser(null);
        } catch (err) {
            toast({
                status: "error",
                description: "Internal server error",
            });
        } finally {
            setIsLoading(false);
        }
    }
}
