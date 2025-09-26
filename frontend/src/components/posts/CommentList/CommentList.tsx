import type { Comment } from "../../../types/posts.ts";
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
                <div key={c.id} className={styles.commentBox}>
                    <div className={styles.commentAuthor}>{c.author}</div>
                    <div className={styles.commentText}>{c.content}</div>
                </div>
            ))}
        </div>
    );
}
