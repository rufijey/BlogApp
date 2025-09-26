import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/UI/Layout.tsx";
import { withSuspense } from "../utils/withSuspense";

const PostsPage = lazy(() => import("../pages/PostsPage"));
const PostPage = lazy(() => import("../pages/PostPage"));
const NewPostPage = lazy(() => import("../pages/NewPostPage"));
const UpdatePostPage = lazy(() => import("../pages/UpdatePostPage"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: withSuspense(<PostsPage />) },
            { path: "/post/:id", element: withSuspense(<PostPage />) },
            { path: "/post/:id/edit", element: withSuspense(<UpdatePostPage />) },
            { path: "/new", element: withSuspense(<NewPostPage />) },
        ],
    },
]);
