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
