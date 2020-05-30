import React, {useState, useEffect} from 'react';
import { FlatList, Text, View } from 'react-native';

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect( () => {
    fetch(`http://127.0.0.1:8000/api/movies/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token 47ec21484323984a72b5d949c0981db5afa713d8`
      }
    })
    .then( response => response.json())
    .then( result => setMovies(result))
    .catch( error => console.log(error));
  }, []);

  return (
    <View>
      <Text>Movie List</Text>
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
