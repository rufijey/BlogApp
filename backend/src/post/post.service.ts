import {
	Injectable,
	NotFoundException,
	ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryPostDto } from './dto/query-post.dto';

@Injectable()
export class PostService {
	constructor(@InjectRepository(Post) private postsRepo: Repository<Post>) {}

	async findAll(query: QueryPostDto) {
		const { search, page = 1, limit = 10 } = query;

		let where = {};
		if (search) {
			where = [
				{ title: ILike(`%${search}%`) },
				{ content: ILike(`%${search}%`) },
			];
		}

		const [items, total] = await this.postsRepo.findAndCount({
			where,
			relations: ['comments', 'author'],
			order: { createdAt: 'DESC' },
			skip: (page - 1) * limit,
			take: limit,
		});

		return {
			data: items,
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		};
	}

	async findOne(id: string): Promise<Post> {
		const post = await this.postsRepo.findOne({
			where: { id },
			relations: ['comments', 'author'],
		});
		if (!post) throw new NotFoundException('Post not found');
		return post;
	}

	create(dto: CreatePostDto, userId: string): Promise<Post> {
		console.log(userId);
		const post = this.postsRepo.create({
			...dto,
			author: { id: userId },
		});
		return this.postsRepo.save(post);
	}

	async update(
		id: string,
		dto: UpdatePostDto,
		userId: string,
	): Promise<Post> {
		const post = await this.findOne(id);
		if (post.author.id !== userId) {
			throw new ForbiddenException('You are not the owner of this post');
		}
		Object.assign(post, dto);
		return this.postsRepo.save(post);
	}

	async remove(id: string, userId: string): Promise<void> {
		const post = await this.findOne(id);
		if (post.author.id !== userId) {
			throw new ForbiddenException('You are not the owner of this post');
		}
		await this.postsRepo.remove(post);
	}
}
