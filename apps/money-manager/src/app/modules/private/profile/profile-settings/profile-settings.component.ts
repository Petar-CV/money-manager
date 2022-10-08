import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import {
  currenciesAvailable,
  languagesAvailable,
} from '@petar-cv/translate-utils';

import { UserProfileService } from '../../../../shared/services/user-info/user-profile.service';

@Component({
  selector: 'petar-cv-profile-settings',
  templateUrl: './profile-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  public languagesAvailable = languagesAvailable;
  public currenciesAvailable = currenciesAvailable;

  public form = this.formBuilder.nonNullable.group({
    language: ['', Validators.required],
    currency: ['', Validators.required],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userProfileService: UserProfileService
  ) {
    this.userProfileService.getUserProfileData$().subscribe((userProfile) => {
      if (userProfile) {
        this.form.patchValue(userProfile);
      }
    });
  }

  public onFormSubmit(): void {
    this.userProfileService.updateUserProfile(this.form.getRawValue());
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
