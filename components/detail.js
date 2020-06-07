import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default class MovieDetail extends Component {
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

  editClicked = () => {
    this.navigation.navigate("Edit", {movie: this.movie, updateMovie: this.updateMovie})
  }

  updateMovie = movie => {
    this.setState({title: movie.title, description: movie.description});
  }

  render() {
    return (
      <View style={styles.movie_detail_box}>
        <Text style={styles.text_title_type1}>{this.movie.title}</Text>
        <View style={styles.rating_box}>
          <FontAwesomeIcon icon={ faStar } style={ this.movie.avg_ratings > 0 ? styles.orange : styles.white } />
          <FontAwesomeIcon icon={ faStar } style={ this.movie.avg_ratings > 1 ? styles.orange : styles.white } />
          <FontAwesomeIcon icon={ faStar } style={ this.movie.avg_ratings > 2 ? styles.orange : styles.white } />
          <FontAwesomeIcon icon={ faStar } style={ this.movie.avg_ratings > 3 ? styles.orange : styles.white } />
          <FontAwesomeIcon icon={ faStar } style={ this.movie.avg_ratings > 4 ? styles.orange : styles.white } />
          <Text>({this.movie.no_of_ratings})</Text>
        </View>
        <Text style={styles.text_description_type1}>{this.movie.description}</Text>
        <Button title="Edit" onPress={() => this.editClicked(this.movie) } />
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
  },
  orange: {
    color: 'orange'
  },
  white: {
    color: 'white'
  }
});
