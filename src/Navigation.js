/**
* Navigation
* @flow
*/
import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigationActions, appActions } from '@flux/actions';
import { getStore } from '@flux/configureStore';
import { screens as SCREENS } from '@config/screenNames';
import Routes from '@config/routes';

import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

const navigatorSettings = {
  initialRouteName: SCREENS.HOME,
  transitionConfig: getSlideFromRightTransition,
  headerMode: 'none'
};

export const AppNavigator = StackNavigator({ ...Routes }, navigatorSettings);

type Props = {
  navigation: Object,
  navActions: Object,
  appActions: Object,
  lang: Object
};

class Navigation extends Component {
  props: Props;

  constructor(props: Props) {
    super(props);
    this.store = getStore();
  }

  componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', this._handleBackAction);
  }

  componentWillUnmount(): void {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this._handleBackAction
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <AppNavigator
          navigation={addNavigationHelpers({
            state: navigation,
            dispatch: this.store.dispatch
          })}
        />
      </View>
    );
  }

  _handleBackAction = (): boolean => {
    const { navActions, navigation } = this.props;
    if (navigation.index === 0) {
      return false;
    }
    navActions.backBySteps();
    return true;
  };
}

export default connect(
  state => ({
    navigation: state.navigation,
    lang: state.app.lang
  }),
  dispatch => ({
    navActions: bindActionCreators(navigationActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
  })
)(Navigation);
