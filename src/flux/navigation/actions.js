/**
 * Navigation actions
 * @flow
 */
import {
  BACK_BY_STEPS,
  BACK_WITH_PARAMS,
  RESET_TO_HOME,
  RESET
} from '../actionTypes';

export type NavActions = {
  backBySteps: Function,
  backWithParams: Function,
  reset: Function,
  resetToHome: Function,
  resetWithHome: Function
};

export function backBySteps(steps: number = 1) {
  return {
    type: BACK_BY_STEPS,
    steps: steps - 1
  };
}

export function backWithParams(params: Object, steps: number = 1) {
  return {
    type: BACK_WITH_PARAMS,
    params,
    steps: steps - 1
  };
}

export function reset(data: Array<Object>) {
  return {
    type: RESET,
    data
  };
}

export function resetToHome() {
  return {
    type: RESET_TO_HOME
  };
}
