import { PartialType } from '@nestjs/swagger';

import { CreateAdminCreditCardItemDto } from './create-admin-credit-card-item.dto';

export class UpdateAdminCreditCardItemDto extends PartialType(
  CreateAdminCreditCardItemDto
) {}
