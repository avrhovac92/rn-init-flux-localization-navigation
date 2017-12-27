/**
 * App actions
 * @flow
 */
import * as types from '@flux/actionTypes';
import LocalizedStrings from 'react-native-localization';
import { availableLanguages, availableLanguagesCustomFormat } from '@lang';
import moment from 'moment';

/**
* On app start, called on app start
*/
export function onAppStart(): Function {
  return function(dispatch: Function, getState: Function) {
    //To be done on app starting
    dispatch(initLanguages());
  };
}

/**
* On app resume, called on app resume event
*/
export function onAppResume(): Function {
  return function(dispatch: Function, getState: Function) {
    //To be done on app resuming
  };
}

export function online() {
  return function(dispatch: Function, getState: Function) {
    dispatch({
      type: types.ONLINE
    });
  };
}

export function offline() {
  return function(dispatch: Function) {
    dispatch({
      type: types.OFFLINE
    });
  };
}

export function initLanguages(): Function {
  return function(dispatch, getState) {
    const { app: { selectedLanguage } } = getState();
    const language = new LocalizedStrings(availableLanguagesCustomFormat);
    let languageToSet = 'en';
    if (selectedLanguage !== null) {
      languageToSet = selectedLanguage;
    } else {
      let interfaceLanguage = language.getInterfaceLanguage();
      if (interfaceLanguage in availableLanguagesCustomFormat) {
        languageToSet = interfaceLanguage;
      } else {
        interfaceLanguage = interfaceLanguage.slice(0, 2);
        if (interfaceLanguage in availableLanguagesCustomFormat) {
          languageToSet = interfaceLanguage;
        }
      }
    }
    language.setLanguage(languageToSet);
    moment.locale(languageToSet);
    dispatch({
      type: types.APP_INIT_LANGUAGES,
      data: language,
      lang: languageToSet
    });
  };
}

export function setLanguage(lang: string): Function {
  return function(dispatch, getState) {
    const language = new LocalizedStrings(availableLanguagesCustomFormat);
    language.setLanguage(lang);
    moment.locale(lang);
    dispatch({
      type: types.APP_SET_LANGUAGE,
      data: {
        language,
        lang
      }
    });
  };
}

export function getActiveLanguage(): Function {
  return function(dispatch, getState) {
    const { language } = getState().app;
    return language.getLanguage();
  };
}

export function getAvailableLanguages(lang: string): Function {
  return function(dispatch, getState) {
    return availableLanguages;
  };
}
