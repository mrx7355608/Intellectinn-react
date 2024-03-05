import { ChangeEvent } from "react";

export type IInputComponentsProps = {
    name?: string;
    placeholder?: string;
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};
