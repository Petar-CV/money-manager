import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePublicCreditCardItemDto {
  @ApiProperty({ description: 'Name of the credit card item.' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Description of the credit card item.' })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({ description: "Credit card item's instalments." })
  @IsNumber()
  readonly instalments: number;

  @ApiProperty({ description: "Credit card item's amount." })
  @IsNumber()
  readonly amount: number;

  @ApiProperty({ description: "Credit card's billing date." })
  @IsDate()
  readonly boughtAt: Date;

  @ApiProperty({ description: "ID of the item's credit card." })
  @IsString()
  readonly cardId: string;
}
