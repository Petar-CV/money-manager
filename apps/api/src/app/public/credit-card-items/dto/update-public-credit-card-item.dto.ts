import { PartialType } from '@nestjs/swagger';

import { CreatePublicCreditCardItemDto } from './create-public-credit-card-item.dto';

export class UpdatePublicCreditCardItemDto extends PartialType(
  CreatePublicCreditCardItemDto
) {}
