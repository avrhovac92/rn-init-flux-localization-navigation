/**
 * AudienceOverview component
 *
 * @flow
 */
import { View, Text } from 'react-native';
import { homeStyle } from '@styles';
import React from 'react';

const Home = () => {
  return (
    <View style={homeStyle.container}>
      <Text style={homeStyle.welcome}>Welcome to React Native!</Text>
      <Text style={homeStyle.instructions}>
        To get started, edit index.android.js
      </Text>
      <Text style={homeStyle.instructions}>
        Double tap R on your keyboard to reload,{'\n'}
        Shake or press menu button for dev menu
      </Text>
    </View>
  );
};

export default Home;
