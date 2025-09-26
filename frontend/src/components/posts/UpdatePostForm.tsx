import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { useUpdatePostMutation } from "../../services/postsApi.ts";
import BaseForm from "../UI/BaseForm/BaseForm.tsx";
import {useNavigate} from "react-router-dom";
import {updatePostSchema, type updatePostFormValues } from "../../schemas/updatePost.schema.ts";

type Props = {
    postId: string;
    initialValues: Partial<updatePostFormValues>;
};

export default function UpdatePostForm({ postId, initialValues }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<updatePostFormValues>({
        resolver: zodResolver(updatePostSchema),
        defaultValues: initialValues,
    });

    const [updatePost] = useUpdatePostMutation();

    const navigate = useNavigate();

    const onSubmit = async (data: updatePostFormValues) => {
        await updatePost({ id: postId, data }).unwrap();
        navigate(`/post/${postId}`)

    };

    return (
        <BaseForm onSubmit={handleSubmit(onSubmit)} submitText="Update Post">
            <TextField
                label="Title"
                fullWidth
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
                sx={{ mb: 2 }}
            />
            <TextField
                label="Content"
                fullWidth
                multiline
                rows={5}
                {...register("content")}
                error={!!errors.content}
                helperText={errors.content?.message}
            />
        </BaseForm>
    );
}
