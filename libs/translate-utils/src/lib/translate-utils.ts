export const languagesAvailable = ['en', 'hr'] as const;

/**
 * Checks if the given language is supported
 * @param lang language code in the format 'en'
 * @returns true if the language is supported, otherwise false
 */
export const isLangAvailable = (lang: string): boolean => {
  const isAvailable = languagesAvailable.find((elem) => elem === lang);

  return isAvailable ? true : false;
};

/**
 * If the user's first visit if from Ex-Yu countries, returns 'hr'
 * Otherwise returns 'en'
 * @param lang language code in the format 'en'
 */
export const checkIfExYuCountry = (lang?: string): string => {
  let newLang;

  switch (lang) {
    case 'hr':
    case 'bs':
    case 'sl':
    case 'sr':
      newLang = 'hr';
      break;
    default:
      newLang = 'en';
      break;
  }

  return newLang;
};
