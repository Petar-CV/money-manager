import { IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  readonly page?: number;

  @IsOptional()
  @IsPositive()
  readonly perPage?: number;
}

export class PaginatedSortAndSearch extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  readonly search?: string;

  @IsOptional()
  @IsString()
  readonly sortOrder?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  readonly sortField?: string;
}
