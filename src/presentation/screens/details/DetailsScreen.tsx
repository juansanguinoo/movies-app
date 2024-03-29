import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {RootStackParams} from '../../navigation/Navigation';
import {useMovie} from '../../hooks/useMovie';
import {FullScreenLoader, MovieDetails, MovieHeader} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const DetailsScreen = ({route}: Props) => {
  const {movieId} = route.params;

  const {movie, isLoading, cast} = useMovie(movieId);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <ScrollView>
      <MovieHeader movie={movie!} />

      <MovieDetails movie={movie!} cast={cast} />
    </ScrollView>
  );
};
