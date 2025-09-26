import {
	Controller,
	Post,
	Body,
	Param,
	Get,
	UsePipes,
	ValidationPipe,
	UseGuards,
	Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('comments')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class CommentController {
	constructor(private readonly commentsService: CommentService) {}

	@UseGuards(JwtAuthGuard)
	@Post(':postId')
	addComment(
		@Param('postId') postId: string,
		@Body() dto: CreateCommentDto,
		@Req() req: Request,
	) {
		console.log(req.user);
		return this.commentsService.addComment(postId, dto, req.user.id);
	}

	@Get(':postId')
	getComments(@Param('postId') postId: string) {
		return this.commentsService.findByPost(postId);
	}
}
