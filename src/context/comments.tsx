import React, { SetStateAction, useState } from "react";
import { IComment } from "../types/articles";

interface ICommentsContext {
    comments: IComment[];
    setComments: React.Dispatch<SetStateAction<IComment[]>>;
}

const CommentsContext = React.createContext<ICommentsContext>({
    comments: [],
    setComments: () => undefined,
});

export const useCommentsContext = () => React.useContext(CommentsContext);

export default function CommentsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [comments, setComments] = useState<IComment[]>([]);
    return (
        <CommentsContext.Provider value={{ comments, setComments }}>
            {children}
        </CommentsContext.Provider>
    );
}
