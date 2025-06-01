export interface Post{
    id: string;
    title: string;
    content: string;
    authorName: string;
    authorEmail: string;
    imageUrl?: string;
    tags: string[];
    published: boolean;
    createdAt: string;
    updatedAt?: string;
}