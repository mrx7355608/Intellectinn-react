import { useState, ChangeEvent, FormEvent } from "react";
import { VStack, Text } from "@chakra-ui/react";
import EmailInput from "../../components/form/EmailInput";
import PasswordInput from "../../components/form/PasswordInput";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import ShowApiError from "../../components/form/ShowApiError";
import { useAuthContext } from "../../context/auth";
import { login } from "../../api/auth";

export default function LoginForm() {
    const { setUser } = useAuthContext();
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
        setApiError(""); // Disappear the previous error message
        setIsLoading(true);
        try {
            const { data, error } = await login(creds);
            if (error) {
                return setApiError(error);
            }
            // set user in auth context
            setUser(data);
        } catch (err) {
            // It's an internal server error because axios will
            // only throw errors with 500 and aboves status code
            setApiError("Internal server error");
        } finally {
            setIsLoading(false);
        }
    }
}
