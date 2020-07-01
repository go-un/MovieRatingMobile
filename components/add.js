import React, { Component } from 'react';
import { Button, View, Text, TextInput, StyleSheet, Alert } from 'react-native';

export default class MovieAdd extends Component {
  constructor(props){
    super(props);
    this.navigation = props.navigation;
    this.state = {
      title: null,
      description: null,
      token: props.navigation.getParam('token', null)
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add New Movie'
    };
  };

  saveClicked = () => {
    if(!this.state.title) {
      console.log("ERROR", "Type new title to save new movie");
    } else if(!this.state.description) {
      console.log("ERROR", "Type new description to save new movie");
    } else {
      console.log(this.state.token);
      fetch(`https://movie-rater-apps.herokuapp.com/api/movies/`, {
        method: 'POST',
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
      .then( result => console.log("ADD:", result.message))
      .catch( error => console.log(error));
      
      this.navigation.goBack();
    }
  }

  render() {
    return (
      <View style={styles.movie_edit_box}>
        <Text>Add New Moive Title</Text>
        <TextInput 
          style={styles.textinput_type1}
          placeholder='new movie title'
          onChangeText={text => this.setState({title: text})}
        />
        <Text>Add New Movie Description</Text>
        <TextInput 
          style={styles.textinput_type1}
          placeholder='new movie description'
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