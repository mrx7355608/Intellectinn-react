import { useState, ChangeEvent, FormEvent } from "react";
import { VStack, Text } from "@chakra-ui/react";
import EmailInput from "../../components/form/EmailInput";
import PasswordInput from "../../components/form/PasswordInput";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import fetchFromServer from "../../utils/fetchFromServer";
import ShowApiError from "../../components/form/ShowApiError";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string>("");
    const [creds, setCreds] = useState({
        email: "",
        password: "",
    });

    return (
        <VStack as="form" onSubmit={onSubmitHandler} w="full">
            {apiError && <ShowApiError error={apiError} />}
            <EmailInput onChangeHandler={onChangeHandler} />
            <PasswordInput onChangeHandler={onChangeHandler} />
            <Text
                cursor={"pointer"}
                fontWeight={"medium"}
                fontSize={"sm"}
                ml={"auto"}
            >
                Forgot password?
            </Text>
            <FormSubmitButton buttonText="Login" isLoading={isLoading} />
        </VStack>
    );

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setCreds({ ...creds, [name]: value });
    }

    async function onSubmitHandler(e: FormEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsLoading(true);
        setApiError("");
        await login();
        setIsLoading(false);
    }

    async function login() {
        const response = await fetchFromServer("/api/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(creds),
        });
        if (response.error) {
            setApiError(response.error);
            return setTimeout(() => setApiError(""), 4000);
        }
        console.log({ data: response.data });
    }
}
