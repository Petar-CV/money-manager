import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePrivateCreditCardDto {
  @ApiProperty({ description: 'Name of the credit card.' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: "Credit card's limit." })
  @IsNumber()
  readonly limit: number;

  @ApiProperty({ description: "Credit card's billing date." })
  @IsDate()
  readonly billingDate: Date;

  @ApiProperty({ description: 'ID of the credit card issuer.' })
  @IsString()
  @IsNotEmpty()
  readonly issuerId: string;
}
