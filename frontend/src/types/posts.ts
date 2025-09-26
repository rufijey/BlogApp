export interface Post {
    id: string;
    title: string;
    content: string;
    comments: Comment[];
    author: User;
}

export interface Comment {
    id: string;
    postId: string;
    author: User;
    content: string;
}
export interface User {
    id: string;
    username: string;
}

export type NewPost = Omit<Post, "id" | "comments">;
export type NewComment = Omit<Comment, "id" | "author">;

export interface PaginatedPosts {
    data: Post[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
