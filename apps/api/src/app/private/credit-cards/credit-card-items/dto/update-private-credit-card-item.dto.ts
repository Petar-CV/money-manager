import { PartialType } from '@nestjs/swagger';

import { CreatePrivateCreditCardItemDto } from './create-private-credit-card-item.dto';

export class UpdatePrivateCreditCardItemDto extends PartialType(
  CreatePrivateCreditCardItemDto
) {}
