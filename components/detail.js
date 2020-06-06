import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function MovieDetail(props) {

  const movie = props.navigation.getParam('movie', null);

  return (
    <View style={styles.movie_detail_box}>
      <Text style={styles.text_title_type1}>{movie.title}</Text>
      <View style={styles.rating_box}>
        <FontAwesomeIcon icon={ faStar } />
        <FontAwesomeIcon icon={ faStar } />
        <FontAwesomeIcon icon={ faStar } />
        <FontAwesomeIcon icon={ faStar } />
        <FontAwesomeIcon icon={ faStar } />
      </View>
      <Text style={styles.text_description_type1}>{movie.description}</Text>
    </View>
  )
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
