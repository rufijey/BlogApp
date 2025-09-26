import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type AuthResponse = {
    id: string;
    username: string;
    access_token: string;
};

export type AuthRequest = {
    username: string;
    password: string;
};

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, AuthRequest>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
        }),
        register: builder.mutation<AuthResponse, AuthRequest>({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
