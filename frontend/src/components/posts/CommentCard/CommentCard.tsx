import type { Comment } from "../../../types/posts.ts";
import styles from "./CommentCard.module.css";

type Props = {
    comment: Comment;
};

export default function CommentCard({ comment }: Props) {
    return (
        <div className={styles.commentBox}>
            <div className={styles.author}>{comment.author.username}</div>
            <div className={styles.content}>{comment.content}</div>
        </div>
    );
}
