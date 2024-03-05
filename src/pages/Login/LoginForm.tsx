import { useState, ChangeEvent, FormEvent } from "react";
import { VStack, Text } from "@chakra-ui/react";
import EmailInput from "../../components/form/EmailInput";
import PasswordInput from "../../components/form/PasswordInput";
import FormSubmitButton from "../../components/form/FormSubmitButton";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [creds, setCreds] = useState({
        email: "",
        password: "",
    });

    return (
        <VStack as="form" onSubmit={onSubmitHandler} w="full">
            <EmailInput onChangeHandler={onChangeHandler} />
            <PasswordInput onChangeHandler={onChangeHandler} />
            <Text
                cursor={"pointer"}
                color={"gray.400"}
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

    function onSubmitHandler(e: FormEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsLoading(true);
        console.log(creds);
        setTimeout(() => setIsLoading(false), 3000);
    }
}
