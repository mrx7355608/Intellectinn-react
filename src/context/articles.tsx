import { create } from "zustand";
import { IArticle } from "../types/articles";

type ArticlesStore = {
    articles: IArticle[];
    setArticles: (data: IArticle[]) => void;
    filterArticle: (id: string) => void;
};

export const useArticles = create<ArticlesStore>()((set) => ({
    articles: [],
    setArticles: (data) => set(() => ({ articles: data })),
    filterArticle: (id) =>
        set((state) => ({
            articles: state.articles.filter((obj) => obj._id !== id),
        })),
}));
