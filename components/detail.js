import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default class MovieDetail extends Component {
  constructor(props){
    super(props);
    this.navigation = props.navigation;
    this.state = {
      movie: props.navigation.getParam('movie', null),
      highlight: 0,
      token: props.navigation.getParam('token', null)
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Movie Detail'),
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('Edit', {movie: navigation.getParam('movie', null), token: navigation.getParam('token', null)})}
          title="Edit"
        />
      ),
    };
  };

  updateMovie = movie => {
    this.setState({title: movie.title, description: movie.description});
  }

  rateClicked = rate => {
    if(rate === 0) {
      Alert.alert("ERROR", 'rate it first! click star icon!');
    } else {
      fetch(`http://172.30.1.11:8000/api/movies/${this.state.movie.id}/rate_movie/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.state.token}`
        },
        body: JSON.stringify({
          stars: rate
        })
      })
      .then( response => response.json())
      .then( result => {
        console.log("RATE:", result.message);
        this.setState({highlight: 0});
      })
      .catch( error => Alert.alert("ERROR", error));
    }
    
  }

  render() {
    return (
      <View style={styles.movie_detail_box}>
        <Text style={styles.text_title_type1}>{this.state.movie.title}</Text>
        <View style={styles.rating_box}>
          <FontAwesomeIcon icon={ faStar } color={ this.state.movie.avg_ratings > 0 ? 'orange' : 'white' } />
          <FontAwesomeIcon icon={ faStar } color={ this.state.movie.avg_ratings > 1 ? 'orange' : 'white' } />
          <FontAwesomeIcon icon={ faStar } color={ this.state.movie.avg_ratings > 2 ? 'orange' : 'white' } />
          <FontAwesomeIcon icon={ faStar } color={ this.state.movie.avg_ratings > 3 ? 'orange' : 'white' } />
          <FontAwesomeIcon icon={ faStar } color={ this.state.movie.avg_ratings > 4 ? 'orange' : 'white' } />
          <Text>({this.state.movie.no_of_ratings})</Text>
        </View>
        <Text style={styles.text_description_type1}>{this.state.movie.description}</Text>

        <Text style={styles.text_title_type1}>Rate it!</Text>
        <View style={styles.rating_box}>
          <FontAwesomeIcon icon={ faStar } color={ this.state.highlight > 0 ? 'purple' : '#ccc' } size={48} onPress={() => this.setState({highlight: 1})} />
          <FontAwesomeIcon icon={ faStar } color={ this.state.highlight > 1 ? 'purple' : '#ccc' } size={48} onPress={() => this.setState({highlight: 2})} />
          <FontAwesomeIcon icon={ faStar } color={ this.state.highlight > 2 ? 'purple' : '#ccc' } size={48} onPress={() => this.setState({highlight: 3})} />
          <FontAwesomeIcon icon={ faStar } color={ this.state.highlight > 3 ? 'purple' : '#ccc' } size={48} onPress={() => this.setState({highlight: 4})} />
          <FontAwesomeIcon icon={ faStar } color={ this.state.highlight > 4 ? 'purple' : '#ccc' } size={48} onPress={() => this.setState({highlight: 5})} />
        </View>
        <Button title="Rate" onPress={() => this.rateClicked(this.state.highlight) } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  movie_detail_box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'olive'
  },
  rating_box: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  text_title_type1: {
    fontSize: 16,
    color: '#fff'
  },
  text_description_type1: {
    fontSize: 16,
    color: '#fff'
  }
});
