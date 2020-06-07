import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MovieList from './components/list';
import MovieDetail from './components/detail';
import MovieEdit from './components/edit';

const AppNavigator = createStackNavigator({
  MovieList: {
    screen: MovieList,
    navigationOptions: {
      title: 'Movie List 🎬'
    }
  },
  Detail: {
    screen: MovieDetail
  },
  Edit: {
    screen: MovieEdit
  }
});

const App = createAppContainer(AppNavigator);

export default App;