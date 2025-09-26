import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';

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

	@OneToMany(() => Comment, (c) => c.post, { cascade: true })
	comments: Comment[];
}
