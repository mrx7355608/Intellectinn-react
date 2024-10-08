import { Box, Text, Image, Button } from "@chakra-ui/react";
import { useAuth } from "../../../context/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../api/auth";
import useCustomToast from "../../../hooks/useCustomToast";

export default function UserInfo() {
    const { user, logoutUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const { showSuccessToast, showErrorToast } = useCustomToast();

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
                isLoading={isLoading}
                disabled={isLoading}
            >
                Logout
            </Button>
        </Box>
    );

    async function onClickHandler() {
        setIsLoading(true);
        try {
            const { error } = await logout();
            if (error) {
                return showErrorToast(error);
            }

            logoutUser(); // set user "null" in auth store
            showSuccessToast("Logout successful");
        } catch (err) {
            showErrorToast("Internal server error");
        } finally {
            setIsLoading(false);
        }
    }
}
