import { Input } from "@chakra-ui/react";
import { IInputComponentsProps } from "../../types/inputs";

export default function FullnameInput({
    onChangeHandler,
}: IInputComponentsProps) {
    return (
        <Input
            placeholder="Full name"
            type="text"
            name="fullname"
            onChange={onChangeHandler}
            w={"full"}
        />
    );
}
