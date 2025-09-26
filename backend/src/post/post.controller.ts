import {
	Controller,
	Get,
	Post as HttpPost,
	Body,
	Param,
	Put,
	Delete,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryPostDto } from './dto/query-post.dto';

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

	@HttpPost()
	create(@Body() dto: CreatePostDto) {
		return this.postsService.create(dto);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
		return this.postsService.update(id, dto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.postsService.remove(id);
	}
}
