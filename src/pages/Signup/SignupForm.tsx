import { useState, ChangeEvent, FormEvent } from "react";
import { VStack } from "@chakra-ui/react";
import EmailInput from "../../components/form/EmailInput";
import PasswordInput from "../../components/form/PasswordInput";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import FullnameInput from "../../components/form/FullnameInput";
import ConfirmPasswordInput from "../../components/form/ConfirmPasswordInput";
import ShowApiError from "../../components/form/ShowApiError";
import fetchFromServer from "../../utils/fetchFromServer";

export default function SignupForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string>("");
    const [creds, setCreds] = useState({
        fullname: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    return (
        <VStack as="form" onSubmit={onSubmitHandler} w="full">
            {apiError && <ShowApiError error={apiError} />}
            <FullnameInput onChangeHandler={onChangeHandler} />
            <EmailInput onChangeHandler={onChangeHandler} />
            <PasswordInput onChangeHandler={onChangeHandler} />
            <ConfirmPasswordInput onChangeHandler={onChangeHandler} />
            <FormSubmitButton buttonText="Signup" isLoading={isLoading} />
        </VStack>
    );

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setCreds({ ...creds, [name]: value });
    }

    async function onSubmitHandler(e: FormEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsLoading(true);
        await signup();
        setIsLoading(false);
    }

    async function signup() {
        const response = await fetchFromServer("/api/auth/signup", {
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
        console.log(response);
    }
}
