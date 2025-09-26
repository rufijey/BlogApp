import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "../services/postsApi";
import { authApi } from "../services/authApi";
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(postsApi.middleware)
            .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
