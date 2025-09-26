import { type JSX, Suspense } from "react";
import Loader from "../components/UI/Loader.tsx";

export const withSuspense = (element: JSX.Element) => (
    <Suspense fallback={<Loader />}>{element}</Suspense>
);
