import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminCreditCardIssuerDto {
  @ApiProperty({ description: 'Name of the credit card issuer.' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Logo of the credit card issuer.' })
  @IsString()
  @IsNotEmpty()
  readonly logo: string;
}
