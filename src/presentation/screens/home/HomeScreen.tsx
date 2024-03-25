import React from 'react';
import {Text, View} from 'react-native';
import {useMovies} from '../../hooks/useMovies';

export const HomeScreen = () => {
  const {nowPlaying, upcoming, topRated, popular} = useMovies();

  console.log('peliculas en cartelera', nowPlaying[0]);
  console.log('peliculas a punto de estrenarse', upcoming[0]);
  console.log('peliculas mejor valoradas', topRated[0]);
  console.log('peliculas populares', popular[0]);

  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};
