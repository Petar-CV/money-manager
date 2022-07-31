import { ApiProperty } from '@nestjs/swagger';
import { CreditCardLimit } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

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

  @ApiProperty({
    description: "Credit card's billing date (day of the month).",
  })
  @IsNumber()
  @Min(1)
  @Max(31)
  readonly billingDate: number;

  @ApiProperty({ description: 'ID of the credit card issuer.' })
  @IsString()
  @IsNotEmpty()
  readonly issuerId: string;

  @ApiProperty({ description: 'Credit card limit type.' })
  @IsEnum(CreditCardLimit)
  readonly limitType: CreditCardLimit;
}
