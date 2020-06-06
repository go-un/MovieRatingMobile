import React, {useState, useEffect} from 'react';
import { FlatList, Text, View, StyleSheet, ImageBackground } from 'react-native';

export default function MovieList(props) {
  const [movies, setMovies] = useState([]);
  let state = {
    token: '47ec21484323984a72b5d949c0981db5afa713d8'
  }

  useEffect( () => {
    fetch(`${process.env.STARBUCKS_REACT_NATIVE_API_URL}/api/movies/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${state.token}`
      }
    })
    .then( response => response.json())
    .then( result => setMovies(result))
    .catch( error => console.log(error));
  }, []);

  return (
    <View style={styles.movie_list_box}>
      <Text style={styles.text_title_type1}>Movie List</Text>
      <FlatList 
        data={movies}
        style={styles.movie_list}
        numColumns={3}
        renderItem={({item}) => (
          <View style={styles.movie_list_item}>
            <ImageBackground style={styles.image_background_type1} source={'//via.placeholder.com/500x500'}>
              <View style={styles.movie_list_textbox}>
                <Text style={styles.text_title_type2}>{item.title}</Text>
                <Text style={styles.text_description_type1}>{item.description}</Text>
              </View>
            </ImageBackground>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  movie_list_box: {
    width: '100%',
    backgroundColor: 'orange',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movie_list: {
    width: '100%',
    maxWidth: '1100px',
    padding: '6px',
    flexWrap: 'wrap'
  },
  movie_list_item: {
    width: '33.3%',
    padding: '6px'
  },
  movie_list_textbox: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: '10px',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    maxHeight: '50%',
    overflowY: 'auto'
  },
  image_background_type1: {
    paddingTop: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  text_title_type1: {
    fontSize: '16px',
    color: '#fff'
  },
  text_title_type2: {
    fontSize: '16px',
    color: '#fff'
  },
  text_description_type1: {
    fontSize: '16px',
    color: '#fff'
  }
});
