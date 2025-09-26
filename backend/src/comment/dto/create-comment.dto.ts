import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCommentDto {
	@IsString()
	@IsNotEmpty()
	content: string;
}
