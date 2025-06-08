export interface Post{
    id: string;
    authorName: string;
    authorEmail: string;
    createdAt: string;
    updatedAt?: string;

    published: boolean;
    publishedAt?: string;

    publishedVersion?:{
        title: string;
        content: string;
        imageUrl?: string;
        tags: string[];
        updatedAt: string;
    };

    draft:{
        title:string;
        content:string;
        imageUrl?:string;
        tags:string[];
    };
}