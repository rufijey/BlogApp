import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TextField} from "@mui/material";
import {useCreatePostMutation} from "../../services/postsApi.ts";
import BaseForm from "../UI/BaseForm/BaseForm.tsx";
import type {NewPost} from "../../types/posts.ts";
import {useNavigate} from "react-router-dom";
import {createPostSchema, type createPostFormValues} from "../../schemas/createPost.schema.ts";


export default function CreatePostForm() {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<createPostFormValues>({
        resolver: zodResolver(createPostSchema),
    });

    const [createPost] = useCreatePostMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: createPostFormValues) => {
        await createPost(data as NewPost).unwrap();
        reset();
        navigate("/");
    };

    return (
        <BaseForm onSubmit={handleSubmit(onSubmit)} submitText="Create Post">
            <TextField
                label="Title"
                fullWidth
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
                sx={{mb: 2}}
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
