import { useState, ChangeEvent, FormEvent } from "react";
import { VStack } from "@chakra-ui/react";
import EmailInput from "../../components/form/EmailInput";
import PasswordInput from "../../components/form/PasswordInput";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import FullnameInput from "../../components/form/FullnameInput";
import ConfirmPasswordInput from "../../components/form/ConfirmPasswordInput";

export default function SignupForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [creds, setCreds] = useState({
        fullname: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    return (
        <VStack as="form" onSubmit={onSubmitHandler} w="full">
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

    function onSubmitHandler(e: FormEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsLoading(true);
        console.log(creds);
        setTimeout(() => setIsLoading(false), 3000);
    }
}
