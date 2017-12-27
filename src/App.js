/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppState,
  UIManager,
  NetInfo,
  Platform,
} from 'react-native';

import { Provider } from 'react-redux';
import { appActions } from '@flux/actions';
import configureStore from '@flux/configureStore';
import Navigation from "./Navigation";

type State = {
  store: configureStore,
  rehydrated?: boolean
};

const CHECK_NETWORK_TIMEOUT = 1000;

export default class Discounts extends Component {
  state: State;

  componentWillMount(): void {
    // Enable android layout animations
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentDidMount(): void {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount(): void {
    //Remove connection listener
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectionChange
    );
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  constructor(): void {
    super();
    this.state = {
      store: configureStore((): void => {
        this.setState({ rehydrated: true }, (): void => {
          this._onAppStart();
          this._checkConnection();
        });
      })
    };
  }
  render() {
    return (
      <Provider store={this.state.store}>
        <Navigation />
      </Provider>
    );
  }
  /**
 * Run on app start
 */
  _onAppStart = (): void => {
    const { store } = this.state;
    store.dispatch(appActions.onAppStart());
  };

  /**
  * Handle connection status change
  */
  _handleConnectionChange = (isConnected: boolean): void => {
    let { store } = this.state;
    if (isConnected) {
      store.dispatch(appActions.online());
    } else {
      store.dispatch(appActions.offline());
    }
  };

  /**
  * Handle AppStateChange
  */
  _handleAppStateChange = (appState: string): void => {
    let { store } = this.state;
    if (appState === 'active') {
      store.dispatch(appActions.onAppResume());
    }
    Platform.OS === 'android' &&
      NetInfo.isConnected
        .fetch()
        .done(isConnected => this._handleConnectionChange(isConnected));
  };
  /**
  * Add listener to network status change
  * iOS fires check automatically on adding listener
  * Android needs to run check manually
  * Timeout is needed because Android return incorrect network state
  */
  _checkConnection = (): void => {
    setTimeout(() => {
      NetInfo.isConnected.addEventListener(
        'connectionChange',
        this._handleConnectionChange
      );
      Platform.OS === 'android' &&
        NetInfo.isConnected.fetch().done(isConnected => {
          this._handleConnectionChange(isConnected);
        });
    }, CHECK_NETWORK_TIMEOUT);
  };
}
