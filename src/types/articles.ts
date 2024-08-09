export interface IArticle {
    _id: string;
    title: string;
    thumbnail: string;
    tags: string[];
    likes: string[];
    bookmarkedBy: string[];
    content: string;
    timeToReadInMinutes: string;
    summary: string;
    slug: string;
    author: {
        _id: string;
        profilePicture: string;
        fullname: string;
    };
    createdAt: Date;
}

export interface IInputArticle {
    title: string;
    thumbnail: string;
    tags: string[];
    content: string;
    timeToReadInMinutes: number;
    summary: string;
}

export interface IComment {
    _id: string;
    text: string;
    user: {
        profilePicture: string;
        _id: string;
        fullname: string;
    };
    createdAt: Date;
    updatedAt: Date;
}
