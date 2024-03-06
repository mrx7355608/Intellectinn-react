import { Box, Input, Textarea, Select, Button, Text } from "@chakra-ui/react";

export default function Writepage() {
    return (
        <Box
            display={"flex"}
            alignItems={"center"}
            flexDir={"column"}
            justifyContent={"center"}
            maxW={"60vw"}
            minH={"100vh"}
            mx={"auto"}
            py={"12"}
        >
            <Input
                size={"lg"}
                variant={"flushed"}
                placeholder="Title"
                fontSize={"2xl"}
            />
            <Textarea
                variant={"flushed"}
                rows={18}
                mt={"5"}
                fontSize={"lg"}
                placeholder="Article"
                resize={"none"}
            ></Textarea>
            <Text></Text>
            <Select placeholder="Select publish status" mt={"12"}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
            </Select>
            <Select placeholder="Select category" mt={"8"}>
                <option value="web development">Web development</option>
                <option value="game development">Game development</option>
                <option value="game development">Game development</option>
                <option value="game development">Game development</option>
                <option value="game development">Game development</option>
                <option value="game development">Game development</option>
                <option value="game development">Game development</option>
                <option value="game development">Game development</option>
                <option value="game development">Game development</option>
                <option value="game development">Game development</option>
                <option value="game development">Game development</option>
            </Select>
            <Button colorScheme="teal" w="full" mt={"12"}>
                Create
            </Button>
        </Box>
    );
}
