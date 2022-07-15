import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAdminCreditCardDto {
  @ApiProperty({ description: 'ID of the user the card belongs to.' })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({ description: 'Name of the credit card.' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: "Credit card's limit." })
  @IsNumber()
  @IsNotEmpty()
  readonly limit: number;

  @ApiProperty({ description: "Credit card's billing date." })
  @IsDate()
  readonly billingDate: Date;

  @ApiProperty({ description: 'ID of the credit card issuer.' })
  @IsString()
  @IsNotEmpty()
  readonly issuerId: string;
}
