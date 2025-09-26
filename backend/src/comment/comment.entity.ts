import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';

@Entity()
export class Comment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ length: 100 })
	author: string;

	@Column('text')
	content: string;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
	post: Post;
}
