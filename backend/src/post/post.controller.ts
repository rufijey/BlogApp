import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Put,
	Delete,
	Query,
	UsePipes,
	ValidationPipe,
	UseGuards,
	Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryPostDto } from './dto/query-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('posts')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class PostController {
	constructor(private readonly postsService: PostService) {}

	@Get()
	findAll(@Query() query: QueryPostDto) {
		return this.postsService.findAll(query);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.postsService.findOne(id);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() dto: CreatePostDto, @Req() req: Request) {
		console.log('user', req.user);
		return this.postsService.create(dto, req.user.id);
	}

	@UseGuards(JwtAuthGuard)
	@Put(':id')
	update(
		@Param('id') id: string,
		@Body() dto: UpdatePostDto,
		@Req() req: Request,
	) {
		return this.postsService.update(id, dto, req.user.id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	remove(@Param('id') id: string, @Req() req: Request) {
		return this.postsService.remove(id, req.user.id);
	}
}
