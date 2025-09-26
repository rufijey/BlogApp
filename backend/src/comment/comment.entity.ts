import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../auth/user.entity';

@Entity()
export class Comment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('text')
	content: string;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(() => User, (user) => user.comments, {
		nullable: false,
		eager: true,
		onDelete: 'CASCADE',
	})
	author: User;

	@ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
	post: Post;
}
