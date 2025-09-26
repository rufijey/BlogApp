import {
	Controller,
	Post,
	Body,
	Param,
	Get,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class CommentController {
	constructor(private readonly commentsService: CommentService) {}

	@Post(':postId')
	addComment(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
		return this.commentsService.addComment(postId, dto);
	}

	@Get(':postId')
	getComments(@Param('postId') postId: string) {
		return this.commentsService.findByPost(postId);
	}
}
