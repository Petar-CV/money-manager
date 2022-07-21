import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';

import { loadDefaultProfileFromLang } from '@petar-cv/translate-utils';
import { IUserProfile } from '@petar-cv/money-manager-models';
import { IModifiedApiResponse } from '@petar-cv/api-interfaces';

import { BASE_PRIVATE_API } from '../../constants/app.constants';

@Injectable()
export class UserProfileService {
  private baseURL: string;
  private readonly userProfile = new BehaviorSubject<IUserProfile | undefined>(
    undefined
  );

  constructor(
    private readonly http: HttpClient,
    private readonly localStorage: LocalStorageService,
    private readonly translateService: TranslateService
  ) {
    this.baseURL = `${BASE_PRIVATE_API}/profile/settings`;
  }

  /**
   * It returns the current value of the userProfile BehaviorSubject
   * @returns The current value of the userProfile BehaviorSubject.
   */
  public getCurrentUserProfileData(): IUserProfile | undefined {
    return this.userProfile.getValue();
  }

  private fetchUserProfileData(): void {
    this.http
      .get<IModifiedApiResponse<IUserProfile | null>>(this.baseURL)
      .pipe(map((res) => res.data ?? null))
      .subscribe({
        next: (userProfile) => {
          if (userProfile) {
            this.setUserProfileData(userProfile);
          } else {
            this.determineUserProfileData();
            this.createUserProfileData();
          }
        },
        error: () => {
          this.determineUserProfileData();
        },
      });
  }

  public updateUserProfile(userProfile: IUserProfile): void {
    this.http
      .put<IModifiedApiResponse<IUserProfile>>(this.baseURL, userProfile)
      .subscribe(() => {
        this.setUserProfileData(userProfile);
      });
  }

  /**
   * It returns an observable of the user profile data
   * @returns Observable<IUserProfile | undefined>
   */
  public getUserProfileData$(): Observable<IUserProfile | undefined> {
    return this.userProfile.asObservable();
  }

  /**
   * It takes a user profile object as an argument, and then it sets the userProfile property to the
   * value of the userProfile argument
   * @param {IUserProfile} userProfile - IUserProfile - This is the user profile object that we are
   * going to pass to the userProfile subject.
   */
  private setUserProfileData(userProfile: IUserProfile): void {
    this.userProfile.next(userProfile);
    this.translateService.use(userProfile.language);
    this.localStorage.store('userProfile', userProfile);
  }

  private createUserProfileData(): void {
    this.http
      .post<IModifiedApiResponse<IUserProfile>>(
        this.baseURL,
        this.userProfile.value
      )
      .subscribe();
  }

  /**
   * If the user profile data is not in local storage, check if the browser language is supported.
   * If it is, load the default user profile data from the browser language
   */
  public determineUserProfileData(): void {
    // If not in local storage, check if browser language is supported
    const browserLang = this.translateService.getBrowserLang();

    const defaultUserProfile = loadDefaultProfileFromLang(browserLang);

    this.setUserProfileData(defaultUserProfile);
  }

  /**
   * It loads the user profile data from local storage and sets it to the user profile data in the
   * store
   */
  public loadUserProfileDataFromLocalStorage(): void {
    const userProfile = this.localStorage.retrieve(
      'userProfile'
    ) as IUserProfile;

    if (userProfile) {
      this.setUserProfileData(userProfile);
    }

    this.fetchUserProfileData();
  }
}