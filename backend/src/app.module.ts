import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Post } from './post/post.entity';
import { PostModule } from './post/post.module';
import { Comment } from './comment/comment.entity';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.POSTGRES_HOST || 'localhost',
			port: Number(process.env.POSTGRES_PORT) || 5432,
			username: process.env.POSTGRES_USER || 'postgres',
			password: process.env.POSTGRES_PASSWORD || 'postgres',
			database: process.env.POSTGRES_DB || 'blog',
			entities: [Post, Comment, User],
			synchronize: true,
		}),
		PostModule,
		CommentModule,
		AuthModule,
	],
})
export class AppModule {}
