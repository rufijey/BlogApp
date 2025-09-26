import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/UI/Layout.tsx";
import { withSuspense } from "../utils/withSuspense";
import ProtectedRoute from "../components/routes/ProtectedRoute.tsx";

const PostsPage = lazy(() => import("../pages/PostsPage"));
const PostPage = lazy(() => import("../pages/PostPage"));
const NewPostPage = lazy(() => import("../pages/NewPostPage"));
const UpdatePostPage = lazy(() => import("../pages/UpdatePostPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: withSuspense(<PostsPage />) },
            { path: "/post/:id", element: withSuspense(<PostPage />) },
            {
                path: "/post/:id/edit",
                element: withSuspense(
                    <ProtectedRoute>
                        <UpdatePostPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/new",
                element: withSuspense(
                    <ProtectedRoute>
                        <NewPostPage />
                    </ProtectedRoute>
                ),
            },
            { path: "/login", element: withSuspense(<LoginPage />) },
            { path: "/register", element: withSuspense(<RegisterPage />) },
        ],
    },
]);
