import { PartialType } from '@nestjs/swagger';

import { CreatePublicCreditCardDto } from './create-public-credit-card.dto';

export class UpdatePublicCreditCardDto extends PartialType(
  CreatePublicCreditCardDto
) {}
