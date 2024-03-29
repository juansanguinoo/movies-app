/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {useMovies} from '../../hooks/useMovies';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {
  FullScreenLoader,
  HorizontalCarousel,
  PosterCarousel,
} from '../../components';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming,
    popularNextPage,
    topRatedNextPage,
    upcomingNextPage,
  } = useMovies();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <ScrollView>
      <View style={{marginTop: top + 20, paddingBottom: 30}}>
        <PosterCarousel movies={nowPlaying} />

        <HorizontalCarousel
          movies={popular}
          title="Populares"
          loadNextPage={popularNextPage}
        />

        <HorizontalCarousel
          movies={topRated}
          title="Mejor calificadas"
          loadNextPage={topRatedNextPage}
        />

        <HorizontalCarousel
          movies={upcoming}
          title="Próximamente"
          loadNextPage={upcomingNextPage}
        />
      </View>
    </ScrollView>
  );
};
