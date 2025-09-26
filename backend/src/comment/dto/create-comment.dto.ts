import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCommentDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(100)
	author: string;

	@IsString()
	@IsNotEmpty()
	content: string;
}
