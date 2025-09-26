import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { NewComment, NewPost, Post, Comment, PaginatedPosts } from "../types/posts.ts";

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    tagTypes: ["Post", "PostsList", "Comment"],
    endpoints: (builder) => ({

        getPosts: builder.query<PaginatedPosts, { search?: string; page?: number; limit?: number }>({
            query: ({ search, page = 1, limit = 10 }) => ({
                url: "/posts",
                params: { search, page, limit },
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map((post) => ({ type: "Post" as const, id: post.id })),
                        { type: "PostsList", id: "LIST" },
                    ]
                    : [{ type: "PostsList", id: "LIST" }],
        }),

        getPost: builder.query<Post, string>({
            query: (id) => `/posts/${id}`,
            providesTags: (_, __, id) => [{ type: "Post", id }],
        }),

        createPost: builder.mutation<Post, NewPost>({
            query: (body) => ({ url: "/posts", method: "POST", body }),
            invalidatesTags: [{ type: "PostsList", id: "LIST" }],
        }),

        updatePost: builder.mutation<Post, { id: string; data: NewPost }>({
            query: ({ id, data }) => ({ url: `/posts/${id}`, method: "PUT", body: data }),
            invalidatesTags: (_, __, { id }) => [
                { type: "Post", id },
                { type: "PostsList", id: "LIST" },
            ],
        }),

        deletePost: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({ url: `/posts/${id}`, method: "DELETE" }),
            invalidatesTags: [{ type: "PostsList", id: "LIST" }],
        }),

        getComments: builder.query<Comment[], string>({
            query: (postId) => `/comments/${postId}`,
            providesTags: (result) =>
                result ? result.map((c) => ({ type: "Comment" as const, id: c.id })) : [],
        }),

        addComment: builder.mutation<Comment, NewComment & { postId: string }>({
            query: ({ postId, ...data }) => ({ url: `/comments/${postId}`, method: "POST", body: data }),
            invalidatesTags: (result, _, { postId }) => [
                { type: "Post", id: postId },
                { type: "Comment", id: result?.id },
            ],
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPostQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useGetCommentsQuery,
    useAddCommentMutation,
} = postsApi;
