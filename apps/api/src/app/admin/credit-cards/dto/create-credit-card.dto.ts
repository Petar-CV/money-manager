import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateCreditCardDto {
  @ApiProperty({ description: 'ID of the user the card belongs to.' })
  @IsString()
  readonly userId: string;

  @ApiProperty({ description: 'Name of the credit card.' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: "Credit card's limit." })
  @IsNumber()
  readonly limit: number;

  @ApiProperty({ description: "Credit card's billing date." })
  @IsDate()
  readonly billingDate: Date;

  @ApiProperty({ description: 'ID of the credit card issuer.' })
  @IsString()
  readonly issuerId: string;
}
