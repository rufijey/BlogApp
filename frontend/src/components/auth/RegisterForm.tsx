import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Alert, Stack } from "@mui/material";
import { useRegisterMutation } from "../../services/authApi";
import BaseForm from "../UI/BaseForm/BaseForm";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { type RegisterFormValues, registerSchema } from "../../schemas/register.schema";
import { useState } from "react";

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const [registerUser] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState<string | null>(null);

    const onSubmit = async (data: RegisterFormValues) => {
        setServerError(null);
        try {
            const user = await registerUser(data).unwrap();
            dispatch(setUser({ id: user.id, username: user.username, token: user.access_token }));
            navigate("/");
        } catch (err) {
            setServerError(err?.data?.message || "Registration failed");
        }
    };

    return (
        <BaseForm onSubmit={handleSubmit(onSubmit)} submitText="Register">
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