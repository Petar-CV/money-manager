import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCreditCardIssuerDto {
  @ApiProperty({ description: 'Name of the credit card issuer.' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Logo of the credit card issuer.' })
  @IsString()
  readonly logo: string;
}
