import React, {useState, useEffect} from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function MovieList(props) {
  const [movies, setMovies] = useState([]);
  let state = {
    token: '47ec21484323984a72b5d949c0981db5afa713d8'
  }

  useEffect( () => {
    fetch(`${process.env.REACT_NATIVE_API_URL}/api/movies/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${state.token}`
      }
    })
    .then( response => response.json())
    .then( result => setMovies(result))
    .catch( error => console.log(error));
  }, []);

  const movieClicked = movie => {
    props.navigation.navigate("Detail", {movie: movie})
  }

  return (
    <View style={styles.movie_list_box}>
      <FlatList 
        data={movies}
        style={styles.movie_list}
        renderItem={({item}) => (
          <View style={styles.movie_list_item}>
            <TouchableOpacity onPress={() => movieClicked(item)}>
              <Text style={styles.text_title_type1}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
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

  }
});
