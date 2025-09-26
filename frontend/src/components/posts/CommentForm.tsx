import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TextField} from "@mui/material";
import {useAddCommentMutation} from "../../services/postsApi.ts";
import BaseForm from "../UI/BaseForm/BaseForm.tsx";
import {type createCommentFormValues, createCommentSchema} from "../../schemas/createComment.schema.ts";

type Props = { postId: string };

export default function CommentForm({postId}: Props) {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<createCommentFormValues>({
        resolver: zodResolver(createCommentSchema),
    });

    const [addComment] = useAddCommentMutation();

    const onSubmit = async (data: createCommentFormValues) => {
        await addComment({postId, ...data}).unwrap();

        reset();
    };

    return (
        <BaseForm onSubmit={handleSubmit(onSubmit)} submitText="Add Comment">
            <TextField
                label="Comment"
                fullWidth
                multiline
                rows={3}
                {...register("content")}
                error={!!errors.content}
                helperText={errors.content?.message}
            />
        </BaseForm>
    );
}
