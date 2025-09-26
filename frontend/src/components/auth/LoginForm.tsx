import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Alert, Stack } from "@mui/material";
import { useLoginMutation } from "../../services/authApi";
import BaseForm from "../UI/BaseForm/BaseForm";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { type LoginFormValues, loginSchema } from "../../schemas/login.schema";
import { useState } from "react";

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState<string | null>(null);

    const onSubmit = async (data: LoginFormValues) => {
        setServerError(null);
        try {
            const user = await login(data).unwrap();
            dispatch(setUser({ id: user.id, username: user.username, token: user.access_token }));
            navigate("/");
        } catch (err) {
            setServerError(err?.data?.message || "Invalid credentials");
        }
    };

    return (
        <BaseForm onSubmit={handleSubmit(onSubmit)} submitText="Login">
            <Stack spacing={2}>
                {serverError && <Alert severity="error">{serverError}</Alert>}
                <TextField
                    label="Username"
                    fullWidth
                    {...register("username")}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
            </Stack>
        </BaseForm>
    );
}