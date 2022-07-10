import { PartialType } from '@nestjs/swagger';

import { CreateAdminCreditCardDto } from './create-admin-credit-card.dto';

export class UpdateAdminCreditCardDto extends PartialType(
  CreateAdminCreditCardDto
) {}
