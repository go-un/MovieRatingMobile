import React, {Component} from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Button, AsyncStorage } from 'react-native';

export default class MovieList extends Component {
  constructor(props){
    super(props);
    this.navigation = props.navigation;
    this.state = {
      movies: [],
      token: ''
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Moive List',
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('Add', {token: navigation.state.params.token})}
          title="New"
        />
      ),
    };
  };

  getToken = async () => {
    const token = await AsyncStorage.getItem('MR_Token');
    
    if(token !== 'undefined') {
      this.setState({token: token});
      this.getMovies();
      this.props.navigation.setParams({
        token: this.state.token
      });
    } else {
      alert('Log in first!');
      this.navigation.navigate('Auth');
    }
  }

  getMovies = () => {
    fetch(`https://movie-rater-apps.herokuapp.com/api/movies/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${this.state.token}`
      }
    })
    .then( response => response.json())
    .then( result => this.setState({movies: result}))
    .catch( error => console.log(error));
  }

  componentDidMount() {
    this.getToken();
  }

  render() {
    return (
      <View style={styles.movie_list_box}>
        <FlatList 
          data={this.state.movies}
          style={styles.movie_list}
          renderItem={({item}) => (
            <View style={styles.movie_list_item}>
              <TouchableOpacity onPress={() => this.navigation.navigate("Details", {movie: item, title: item.title, token: this.state.token})}>
                <Text style={styles.text_title_type1}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  movie_list_box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'olive',
  },
  movie_list: {
    width: '100%',
    padding: '2%',
    flexWrap: 'wrap'
  },
  movie_list_item: {
    padding: '2%'
  },
  text_title_type1: {
    fontSize: 16,
    color: '#fff'
  }
});
