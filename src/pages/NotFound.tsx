import {Container, Heading, Text} from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function NotFound(){
    return (
        <Container textAlign={"center"}>
            <Heading fontSize={"4xl"}>404 Not Found</Heading>
            <Text color="gray.600" mt={2} mb={5}>The page you are trying to access does not exist</Text>
            <Link to="/">
                <Text textDecoration={"underline"} color="blue.500">
                    Go to homepage
                </Text>
            </Link>
        </Container>
    )
}
