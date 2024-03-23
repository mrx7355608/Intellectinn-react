import { Input, Box, Button } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export default function Searchbar() {
    return (
        <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            rounded={"full"}
            _focus={{ bg: "gray.100" }}
            bg={"gray.100"}
        >
            <Button
                _hover={{ bg: "transparent" }}
                rounded={"full"}
                bg="transparent"
            >
                <FaSearch size={16} color="inherit" />
            </Button>
            <Input variant="unstyled" placeholder="Search" />
        </Box>
    );
}
