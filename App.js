import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MovieList from './components/list';
import MovieDetail from './components/detail';

const AppNavigator = createStackNavigator({
  MovieList: {
    screen: MovieList
  },
  Detail: {
    screen: MovieDetail
  }
});

const App = createAppContainer(AppNavigator);

export default App;