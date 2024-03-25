import { useState, ChangeEvent, FormEvent } from "react";
import { VStack, Text } from "@chakra-ui/react";
import EmailInput from "../../components/form/EmailInput";
import PasswordInput from "../../components/form/PasswordInput";
import FormSubmitButton from "../../components/form/FormSubmitButton";
// import fetchFromServer from "../../utils/fetchFromServer";
import ShowApiError from "../../components/form/ShowApiError";
import { useAuthContext } from "../../context/auth";
// import { IUser } from "../../types/user";

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
        await login();
    }

    async function login() {
        setIsLoading(true);
        const mockUser = {
            name: "Fawad Imran",
            email: "fwd@gmail.com",
            profilePicture: "/hero.jpg",
            _id: "66014ee6e93f3cd0e0a11a4d",
            followers: [],
            following: [],
            about: "MERN stack developer | Love Nextjs | Pursuing Bachelors in Computer science",
        };
        setTimeout(() => {
            setIsLoading(false);
            setUser(mockUser);
        }, 3000);
    }
}
