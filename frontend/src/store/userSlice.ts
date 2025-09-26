import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
    id: string | null;
    username: string | null;
    token: string | null;
};

const initialState: UserState = {
    id: localStorage.getItem("id") || null,
    username: null,
    token: localStorage.getItem("token") || null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.token = action.payload.token;

            if (action.payload.token) {
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("id", action.payload.id);
            }
        },
        logout: (state) => {
            state.id = null;
            state.username = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;