import { Alert, AlertIcon } from "@chakra-ui/react"

export default function FallbackUI() {
    return (
        <Alert status="error" w={"full"}>
            <AlertIcon />
            There was an error processing your request
        </Alert>
    )
}
