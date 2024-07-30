import { Input, Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
    const navTo = useNavigate();
    const [query, setQuery] = useState("");

    return (
        <Box
            rounded={"full"}
            _focus={{ bg: "gray.100" }}
            bg={"gray.100"}
            w="250px"
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    navTo(`/search?query=${query}`);
                }}
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 9999,
                }}
            >
                <Button
                    type="submit"
                    _hover={{ bg: "transparent" }}
                    rounded={"full"}
                    bg="transparent"
                >
                    <FaSearch size={16} color="inherit" />
                </Button>
                <Input
                    variant="unstyled"
                    placeholder="Search"
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>
        </Box>
    );
}
