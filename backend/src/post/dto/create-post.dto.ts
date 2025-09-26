import {
	IsString,
	IsNotEmpty,
	MaxLength,
	IsOptional,
	IsBoolean,
} from 'class-validator';

export class CreatePostDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	title: string;

	@IsString()
	@IsNotEmpty()
	content: string;

	@IsOptional()
	@IsBoolean()
	published?: boolean = true;
}
