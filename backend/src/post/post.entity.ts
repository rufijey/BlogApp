import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { User } from '../auth/user.entity';

@Entity()
export class Post {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ length: 255 })
	title: string;

	@Column('text')
	content: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(() => User, (user) => user.posts, {
		nullable: false,
		eager: true,
		onDelete: 'CASCADE',
	})
	author: User;

	@OneToMany(() => Comment, (c) => c.post, { cascade: true })
	comments: Comment[];
}
