import React, { Component } from 'react';
import { Button, View, Text, TextInput, StyleSheet, Alert } from 'react-native';

export default class MovieEdit extends Component {
  constructor(props){
    super(props);
    this.navigation = props.navigation;
    this.movie = props.navigation.getParam('movie', null);
    this.state = {
      title: this.movie.title,
      description: this.movie.description,
      token: props.navigation.getParam('token', null)
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: 'Edit',
      headerRight: () => (
        <Button
          onPress={() => params.removeClicked(navigation.getParam('movie', null))}
          title="Remove"
          color="red"
        />
      ),
    };
  };

  componentDidMount() {
  this.props.navigation.setParams({ removeClicked: this.removeClicked });
  }
    
  saveClicked = () => {
    fetch(`http://172.30.1.11:8000/api/movies/${this.movie.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.state.token}`
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description
      })
    })
    .then( response => response.json())
    .then( result => console.log("EDIT:", result.message))
    .catch( error => console.log(error));
    
    this.navigation.goBack();
  }

  removeClicked = movie => {
    fetch(`http://172.30.1.11:8000/api/movies/${movie.id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.state.token}`
      }
    })
    .then( () => {
      Alert.alert('DELETE', 'successfully deleted!');
      this.navigation.navigate('List');
    })
    .catch( error => console.log(error));

  }

  render() {
    return (
      <View style={styles.movie_edit_box}>
        <Text>Edit Moive Title</Text>
        <TextInput 
          style={styles.textinput_type1}
          placeholder={this.state.title}
          onChangeText={text => this.setState({title: text})}
        />
        <Text>Edit Movie Description</Text>
        <TextInput 
          style={styles.textinput_type1}
          placeholder={this.state.description}
          onChangeText={text => this.setState({description: text})}
        />
        <Button title="Save" onPress={() => this.saveClicked()}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  movie_edit_box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'olive'
  },
  textinput_type1: {
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#000',
    padding: '3%'
  }
});
