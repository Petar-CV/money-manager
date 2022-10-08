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
  styleUrls: ['./profile-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  public languagesAvailable = languagesAvailable;
  public currenciesAvailable = currenciesAvailable;

  public profileSettingsForm = this.formBuilder.nonNullable.group({
    language: ['', Validators.required],
    currency: ['', Validators.required],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userProfileService: UserProfileService
  ) {
    this.userProfileService.getUserProfileData$().subscribe((userProfile) => {
      if (userProfile) {
        this.profileSettingsForm.patchValue(userProfile);
      }
    });
  }

  public onFormSubmit(): void {
    this.userProfileService.updateUserProfile(
      this.profileSettingsForm.getRawValue()
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
