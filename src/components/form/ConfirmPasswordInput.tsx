import { Input } from "@chakra-ui/react";
import { IInputComponentsProps } from "../../types/inputs";

export default function ConfirmPasswordInput({
    onChangeHandler,
}: IInputComponentsProps) {
    return (
        <Input
            placeholder="Confirm Password"
            type="password"
            name="confirm_password"
            onChange={onChangeHandler}
            w={"full"}
        />
    );
}
