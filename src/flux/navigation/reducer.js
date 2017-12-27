import {
  SET_PARAMS,
  NAVIGATE,
  BACK,
  BACK_WITH_PARAMS,
  BACK_BY_STEPS,
  RESET,
  RESET_TO_HOME
} from '../actionTypes';
import { screens as SCREENS } from '@config/screenNames';

import { AppNavigator } from '../../Navigation';
import { NavigationActions } from 'react-navigation';
const initAction = AppNavigator.router.getActionForPathAndParams(
  SCREENS.HOME
);
const initialState = AppNavigator.router.getStateForAction(initAction);

function navigationState(state = initialState, action) {
  switch (action.type) {
    case SET_PARAMS:
      return AppNavigator.router.getStateForAction(
        NavigationActions.setParams({
          params: { ...action.params },
          key: action.key
        }),
        state
      );
    case NAVIGATE:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: action.routeName,
          params: { ...action.params },
          action: action.action
        }),
        state
      );
    case BACK:
      return AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
    case BACK_BY_STEPS:
      return AppNavigator.router.getStateForAction(
        NavigationActions.back({
          key: state.routes[state.index - action.steps].key
        }),
        state
      );
    case BACK_WITH_PARAMS:
      const stateWithParams = AppNavigator.router.getStateForAction(
        NavigationActions.setParams({
          params: action.params,
          key: state.routes[state.index - action.steps - 1].key
        }),
        state
      );
      return AppNavigator.router.getStateForAction(
        NavigationActions.back({
          key: state.routes[state.index - action.steps].key
        }),
        stateWithParams
      );
    case RESET:
      return AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: action.data.length - 1,
          actions: action.data.map(route =>
            NavigationActions.navigate({
              routeName: route.routeName,
              params: route.params
            })
          )
        })
      );
    case RESET_TO_HOME:
      return AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: SCREENS.HOME })]
        })
      );
    default:
      return state;
  }
}

export default navigationState;
