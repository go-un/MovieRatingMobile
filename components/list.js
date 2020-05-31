import React, {useState, useEffect} from 'react';
import { FlatList, Text, View } from 'react-native';

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

  return (
    <View>
      <Text>Movie List</Text>
      {console.log("???:", process.env.REACT_NATIVE_API_URL)}
      <FlatList 
        data={movies}
        renderItem={({item}) => (
          <View key={item.id}>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}