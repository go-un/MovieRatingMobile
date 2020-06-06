import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MovieList from './components/list';
import MovieDetail from './components/detail';

const AppNavigator = createStackNavigator({
  MovieList: {
    screen: MovieList,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Movie List 🎬'
    })
  },
  Detail: {
    screen: MovieDetail,
    navigationOptions: ({ navigation }) => ({
      headerTitle: ''
    })
  }
});

const App = createAppContainer(AppNavigator);

export default App;