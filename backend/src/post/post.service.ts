import { Injectable, NotFoundException } from '@nestjs/common';
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
			relations: ['comments'],
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
			relations: ['comments'],
		});
		if (!post) throw new NotFoundException('Post not found');
		return post;
	}

	create(dto: CreatePostDto): Promise<Post> {
		const post = this.postsRepo.create(dto);
		return this.postsRepo.save(post);
	}

	async update(id: string, dto: UpdatePostDto): Promise<Post> {
		await this.postsRepo.update(id, dto);
		return this.findOne(id);
	}

	async remove(id: string): Promise<void> {
		const result = await this.postsRepo.delete(id);
		if (result.affected === 0)
			throw new NotFoundException('Post not found');
	}
}
