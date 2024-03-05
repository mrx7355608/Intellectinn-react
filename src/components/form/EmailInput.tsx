import { Input } from "@chakra-ui/react";
import { IInputComponentsProps } from "../../types/inputs";

export default function EmailInput({ onChangeHandler }: IInputComponentsProps) {
    return (
        <Input
            placeholder="Email address"
            type="email"
            name="email"
            onChange={onChangeHandler}
            w={"full"}
        />
    );
}
