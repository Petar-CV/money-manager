import { PartialType } from '@nestjs/swagger';

import { CreateCreditCardIssuerDto } from './create-credit-card-issuer.dto';

export class UpdateCreditCardIssuerDto extends PartialType(
  CreateCreditCardIssuerDto
) {}
