import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryPostDto {
	@IsOptional()
	@IsString()
	search?: string;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	page?: number = 1;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	limit?: number = 10;
}
