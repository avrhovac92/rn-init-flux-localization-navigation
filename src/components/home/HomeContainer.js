/**
* HomeContainer
* Integration labels:
* - Home
* @flow
*/

import 'react-native';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './components/Home';

export class HomeContainer extends Component {
  render(): React.Element<*> {
    return <Home />;
  }
}

export default connect()(HomeContainer);
