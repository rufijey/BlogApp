import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Post } from '../post/post.entity';

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(Comment) private commentsRepo: Repository<Comment>,
		@InjectRepository(Post) private postsRepo: Repository<Post>,
	) {}

	async addComment(
		postId: string,
		dto: CreateCommentDto,
		userId: string,
	): Promise<Comment> {
		const post = await this.postsRepo.findOne({ where: { id: postId } });
		if (!post) throw new NotFoundException('Post not found');


		const comment = this.commentsRepo.create({
			...dto,
			post,
			author: { id: userId },
		});
		return this.commentsRepo.save(comment);
	}

	async findByPost(postId: string): Promise<Comment[]> {
		return this.commentsRepo.find({
			where: { post: { id: postId } },
			relations: ['author'],
			order: { createdAt: 'DESC' },
		});
	}
}
