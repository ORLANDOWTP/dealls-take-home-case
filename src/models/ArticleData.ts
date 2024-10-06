import { ArticleCategory } from "./ArticleCategory";

export interface ArticleData {
    id: number;
    title: string;
    slug: string;
    content: string;
    created_at: string;
    updated_at: string;
    categories: ArticleCategory[];
}
