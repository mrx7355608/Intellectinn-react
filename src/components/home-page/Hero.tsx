import { Text, Heading, Box, Button } from "@chakra-ui/react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const { user } = useAuth();
    const navTo = useNavigate();

    return (
        <Box
            backgroundImage={"/hero.jpg"}
            backgroundRepeat={"no-repeat"}
            backgroundBlendMode={"darken"}
            backgroundPosition={"center"}
            display={"flex"}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"start"}
            p={"14"}
            h={"100vh"}
            borderBottom={"1px"}
            color={"black"}
        >
            <Heading ml={"14"} fontSize={"7xl"} fontWeight={"medium"}>
                Stay curious.
            </Heading>
            <Text
                lineHeight={"1.1"}
                mt={"2"}
                ml={"14"}
                fontSize={"2xl"}
                w={"40ch"}
            >
                Discover stories, thinking, and expertise from writers on any
                topic.
            </Text>
            <Button
                ml={"14"}
                rounded={"full"}
                colorScheme="yellow"
                px={"9"}
                py={"0"}
                pb={"0.5"}
                mt={"12"}
                onClick={() => {
                    user ? navTo("/write") : navTo("/auth/login");
                }}
            >
                Start reading
            </Button>
        </Box>
    );
}
