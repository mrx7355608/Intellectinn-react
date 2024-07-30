import { Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <Box
            p="6"
            bg="gray.50"
            color="gray.600"
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Text as="span" color="gray.500">
                Developed by
            </Text>
            <Text as="span" ml="1" fontWeight="medium">
                <Link to="https://github.com/mrx7355608" target="_blank">
                    Fawad Imran
                </Link>
            </Text>
            <FaGithub
                color="inherit"
                style={{
                    display: "inline",
                    marginLeft: "5px",
                }}
            />
        </Box>
    );
}
