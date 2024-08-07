import { IComment } from "../../types/articles";
import { Divider, Box, Image, Text } from "@chakra-ui/react";
import DeleteCommentButton from "./DeleteCommentButton";

export default function CommentCard({ comment }: { comment: IComment }) {
    return (
        <>
            <Box
                w="full"
                display="flex"
                justifyContent={"start"}
                alignItems={"end"}
                p="2"
                gap="4"
                my="2"
            >
                <Image
                    src={comment.user.profilePicture}
                    rounded="full"
                    objectFit={"cover"}
                    w="50px"
                    h="50px"
                    mb="auto"
                />
                <Box w="full">
                    <Text as="span" fontWeight={"bold"}>
                        {comment.user.fullname}
                    </Text>
                    <Text>{comment.text}</Text>
                    <Box mt="4">
                        <Text
                            as="span"
                            fontSize="sm"
                            color="gray.500"
                            whiteSpace={"nowrap"}
                        >
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </Text>
                        <Text
                            fontSize="sm"
                            as="span"
                            color="gray.500"
                            whiteSpace={"nowrap"}
                            mx="6"
                        >
                            Edit
                        </Text>
                        <DeleteCommentButton commentID={comment._id} />
                    </Box>
                </Box>
            </Box>
            <Divider mb="7" mt="2" borderColor={"gray.100"} />
        </>
    );
}
