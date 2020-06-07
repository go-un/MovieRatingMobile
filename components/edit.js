import React, { Component } from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';

export default class MovieEdit extends Component {
  constructor(props){
    super(props);

    this.movie = props.navigation.getParam('movie', null);
    this.navigation = props.navigation;
    this.state = {
      title: this.movie.title,
      description: this.movie.description,
      token: '47ec21484323984a72b5d949c0981db5afa713d8'
    }
  }

  saveClicked = () => {
    fetch(`${process.env.REACT_NATIVE_API_URL}/api/movies/${this.movie.id}/`, {
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
    .then( result => console.log(result))
    .catch( error => console.log(error));

    this.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.movie_edit_box}>
        <Text>Edit Moive Title</Text>
        <TextInput 
          style={styles.textinput_type1}
          placeholder='edit title'
          onChangeText={text => this.setState({title: text})}
          value={this.state.title}
        />
        <Text>Edit Movie Description</Text>
        <TextInput 
          style={styles.textinput_type1}
          placeholder='edit movie description'
          onChangeText={text => this.setState({description: text})}
          value={this.state.description}
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
