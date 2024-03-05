import { Input } from "@chakra-ui/react";
import { IInputComponentsProps } from "../../types/inputs";

export default function PasswordInput({
    onChangeHandler,
}: IInputComponentsProps) {
    return (
        <Input
            placeholder="Password"
            type="password"
            name="password"
            onChange={onChangeHandler}
        />
    );
}
