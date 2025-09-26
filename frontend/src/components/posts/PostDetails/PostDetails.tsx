import { useGetPostQuery } from "../../../services/postsApi.ts";
import CommentForm from "../CommentForm.tsx";
import styles from "./PostDetails.module.css";
import LinkButton from "../../UI/LinkButton.tsx";
import { DeletePostButton } from "../DeletePostButton.tsx";
import Loader from "../../UI/Loader.tsx";
import CommentList from "../CommentList/CommentList.tsx";

type Props = { postId: string };

export default function PostDetails({ postId }: Props) {
    const { data: post, isLoading: postLoading } = useGetPostQuery(postId);

    if (postLoading) return <Loader />;
    if (!post) return <div className={styles.notFound}>Post not found</div>;

    return (
        <div className={styles.postContainer}>
            <h1 className={styles.postTitle}>{post.title}</h1>
            <p className={styles.postContent}>{post.content}</p>

            <div className={styles.buttonRow}>
                <LinkButton to={`/post/${post.id}/edit`}>Edit Post</LinkButton>
                <DeletePostButton postId={post.id} />
            </div>

            <hr className={styles.divider} />

            <h2 className={styles.commentsTitle}>Comments</h2>
            <CommentList comments={post.comments} />

            <CommentForm postId={postId} />
        </div>
    );
}
