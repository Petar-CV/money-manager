import { PartialType } from '@nestjs/swagger';

import { CreatePrivateCreditCardDto } from './create-private-credit-card.dto';

export class UpdatePrivateCreditCardDto extends PartialType(
  CreatePrivateCreditCardDto
) {}
