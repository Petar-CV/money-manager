import { PartialType } from '@nestjs/swagger';

import { CreateCreditCardDto } from './create-credit-card.dto';

export class UpdateCreditCardDto extends PartialType(CreateCreditCardDto) {}
