import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	username: string;

	@Column()
	password: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToMany(() => Post, (post) => post.author)
	posts: Post[];

	@OneToMany(() => Comment, (comment) => comment.author)
	comments: Comment[];
}
