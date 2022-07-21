import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfileSettingsDto {
  @ApiProperty({ description: 'Users language.' })
  @IsString()
  @IsNotEmpty()
  readonly language: string;

  @ApiProperty({ description: 'Users currency.' })
  @IsString()
  @IsNotEmpty()
  readonly currency: string;
}
