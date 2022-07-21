import { IUserProfile } from '@petar-cv/money-manager-models';

export interface ILanguage {
  code: string;
  name: string;
}

export interface ICurrency {
  code: string;
  name: string;
  symbol: string;
}

export const languagesAvailable: ILanguage[] = [
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'hr',
    name: 'Hrvatski',
  },
];

export const currenciesAvailable: ICurrency[] = [
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
  },
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
  },
];

/**
 * Checks if the given language is supported
 * @param lang language code in the format 'en'
 * @returns true if the language is supported, otherwise false
 */
export const isLangAvailable = (lang: string): boolean => {
  const isAvailable = languagesAvailable.find((elem) => elem.code === lang);

  return isAvailable ? true : false;
};

/**
 * If the user's first visit if from Ex-Yu countries, returns 'hr'
 * Otherwise returns 'en'
 * @param lang language code in the format 'en'
 */
export const loadDefaultProfileFromLang = (lang?: string): IUserProfile => {
  const defaultUserProfile: IUserProfile = {
    currency: 'USD',
    language: 'en',
  };

  switch (lang) {
    case 'hr':
    case 'bs':
    case 'sl':
    case 'sr':
      defaultUserProfile.currency = 'EUR';
      defaultUserProfile.language = 'hr';
      break;
    default:
      defaultUserProfile.currency = 'USD';
      defaultUserProfile.language = 'en';
      break;
  }

  return defaultUserProfile;
};
