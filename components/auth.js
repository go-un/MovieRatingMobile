import React, { Component } from 'react';
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';

export default class Auth extends Component {
  constructor(props){
    super(props);
    this.navigation = props.navigation;
    this.state = {
      username: null,
      password: null,
      registerView: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Movie Rating'
    };
  };

  componentDidMount() {
    this.getToken();
  }
    
  loginClicked = () => {
    fetch(`https://movie-rater-apps.herokuapp.com/auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then( response => response.json())
    .then( result => {
      this.saveToken(result.token);
      this.navigation.navigate('List');
    })
    .catch( error => console.log(error));
  }

  registerClicked = () => {
    fetch(`https://movie-rater-apps.herokuapp.com/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then( response => response.json())
    .then( result => {
      alert(`Welcome,${result.username}! Let's rate movies`);
      this.setState({registerView: false});
    })
    .catch( error => {
      console.log(error)
      alert(result.username[0]);
    });
  }

  saveToken = async token => {
    await AsyncStorage.setItem('MR_Token', token);
  }

  toggleView = () => {
    this.setState({registerView: !this.state.registerView});
  }

  getToken = async () => {
    const token = await AsyncStorage.getItem('MR_Token');
    if(token) {
      this.navigation.navigate('List');
    } else {
      this.navigation.navigate('Auth');
    }
  }

  render() {
    return (
      <View style={styles.movie_edit_box}>
        <Text>Username</Text>
        <TextInput 
          style={styles.textinput_type1}
          placeholder='type username'
          onChangeText={text => this.setState({username: text})}
        />
        <Text>Password</Text>
        <TextInput 
          style={styles.textinput_type1}
          placeholder='type password'
          onChangeText={text => this.setState({password: text})}
          secureTextEntry={true}
        />
        {
          this.state.registerView ? 
          <View>
            <Button title="Register" onPress={() => this.registerClicked()}/> 
            <TouchableOpacity onPress={() => this.toggleView()}>
              <Text style={styles.text_description_type1}>Do you have an account already? Click here.</Text>
            </TouchableOpacity>
          </View>
          : <View>
              <Button title="Log In" onPress={() => this.loginClicked()}/>
              <TouchableOpacity onPress={() => this.toggleView()}>
                <Text style={styles.text_description_type1}>Don't have an account yet? Register here.</Text>
              </TouchableOpacity>
            </View>
        }
        

        
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
    padding: 10,
    textAlign: 'center',
    color: '#000',
    marginTop: 10,
    marginBottom: 20
  },
  text_description_type1: {
    fontSize: 16,
    color: '#fff',
    marginTop: 30
  }
});
