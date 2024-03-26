import { Box, Text, Image, Button, Spinner } from "@chakra-ui/react";
import { useAuthContext } from "../../context/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserInfo() {
    const { user, setUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Box display="flex" gap="5" alignItems="center">
            <Link to="/profile">
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
                onClick={logout}
                minW="70px"
            >
                {isLoading ? <Spinner size="sm" /> : "Logout"}
            </Button>
        </Box>
    );

    async function logout() {
        setIsLoading(true);
        setTimeout(() => {
            setUser(null);
            setIsLoading(false);
        }, 3000);
    }
}
