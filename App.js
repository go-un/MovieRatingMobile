import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MovieList from './components/list';
import MovieDetail from './components/detail';
import MovieEdit from './components/edit';
import MovieAdd from './components/add';

const AppNavigator = createStackNavigator(
  {
    List: MovieList,
    Details: MovieDetail,
    Edit: MovieEdit,
    Add: MovieAdd
  },
  {
    initialRouteName: 'List',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}