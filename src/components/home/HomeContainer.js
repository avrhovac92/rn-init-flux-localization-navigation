/**
* HomeContainer
* Integration labels:
* - Home
* @flow
*/

import 'react-native';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home';

export class HomeContainer extends Component {
  render(): React.Element<*> {
    console.log('this', this);
    return <Home />;
  }
}

export default connect()(HomeContainer);
