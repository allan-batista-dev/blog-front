export type Post = {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    threadId?: number;
    isActive?: boolean;
    file?: string;
    title?: string;
    content?: string;
    userId?: number;
    subtitle?: string;
    comments?: [
        {
            id?: number;
            created_at?: Date;
            updated_at?: Date;
            text?: string;
            nameAuthor?: string;
            postId?: number;
        }
    ];
}