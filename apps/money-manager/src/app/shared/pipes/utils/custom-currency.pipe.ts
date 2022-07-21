import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { UserProfileService } from '../../services/user-profile/user-profile.service';

@Pipe({
  name: 'customCurrency',
})
export class CustomCurrencyPipe implements PipeTransform {
  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly currencyPipe: CurrencyPipe
  ) {}

  transform(
    value: string | number,
    display?: string | boolean,
    digitsInfo?: string,
    locale?: string
  ): string | null {
    const currentUserProfileSettings =
      this.userProfileService.getCurrentUserProfileData();
    const data = this.currencyPipe.transform(
      value,
      currentUserProfileSettings?.currency,
      display,
      digitsInfo,
      locale
    );

    return data;
  }
}
