/**
 * App based state
 *  @flow
 */

import * as types from '@flux/actionTypes';
import type Action from '../common/types';
import en from '@lang/en';

export type AppStore = {
  lang: Object,
  currentLanguage: string,
  selectedLanguage: ?string
};

const initialState = {
  lang: en, //default language en
  currentLanguage: 'en', // current app language
  connected: true, // default to true.
  selectedLanguage: null //user selected language
};

export default function app(
  state: AppStore = initialState,
  action: Action = {}
): Object {
  switch (action.type) {
    case types.ONLINE:
      return {
        ...state,
        connected: true
      };
    case types.OFFLINE:
      return {
        ...state,
        connected: false
      };
    case types.APP_INIT_LANGUAGES:
      return {
        ...state,
        lang: action.data,
        currentLanguage: action.lang
      };
    case types.APP_SET_LANGUAGE:
      return {
        ...state,
        lang: action.data.language,
        selectedLanguage: action.data.lang,
        currentLanguage: action.data.lang
      };
    default:
      return state;
  }
}
