import type { Comment } from "../../../types/posts.ts";
import CommentCard from "../CommentCard/CommentCard";
import styles from "./CommentList.module.css";

type Props = {
    comments?: Comment[];
};

export default function CommentList({ comments }: Props) {
    if (!comments || comments.length === 0) {
        return <div className={styles.noComments}>No comments yet.</div>;
    }

    return (
        <div className={styles.commentsContainer}>
            {comments.map((c) => (
                <CommentCard key={c.id} comment={c} />
            ))}
        </div>
    );
}
