import { PartialType } from '@nestjs/swagger';

import { CreateAdminCreditCardIssuerDto } from './create-admin-credit-card-issuer.dto';

export class UpdateAdminCreditCardIssuerDto extends PartialType(
  CreateAdminCreditCardIssuerDto
) {}
