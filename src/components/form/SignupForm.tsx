import { useState, ChangeEvent, FormEvent } from "react";
import { VStack } from "@chakra-ui/react";
import EmailInput from "../../components/form/EmailInput";
import PasswordInput from "../../components/form/PasswordInput";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import FullnameInput from "../../components/form/FullnameInput";
import ConfirmPasswordInput from "../../components/form/ConfirmPasswordInput";
import ShowApiError from "../../components/form/ShowApiError";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/auth";

export default function SignupForm() {
    const navTo = useNavigate();
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
        try {
            const { error } = await signup(creds);
            if (error) {
                return setApiError(error);
            }
            return navTo("/auth/login");
        } catch (err) {
            setApiError("Internal server error");
        } finally {
            setIsLoading(false);
        }
    }
}
