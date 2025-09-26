import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Comment } from '../comment/comment.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Post, Comment])],
	controllers: [PostController],
	providers: [PostService],
})
export class PostModule {}
