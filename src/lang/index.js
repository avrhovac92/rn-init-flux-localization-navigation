import en from './en';
import de from './de';

export const availableLanguages = [
  { code: 'en', name: 'English', lang: en },
  { code: 'de', name: 'Deutsch', lang: de }
];

export const availableLanguagesCustomFormat = availableLanguages.reduce(
  (acc, cur) => {
    acc[cur.code] = cur.lang;
    return acc;
  },
  {}
);
