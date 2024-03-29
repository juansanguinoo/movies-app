/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {FullMovie} from '../../../core/entities/movie.entity';
import {Formatter} from '../../../config/helpers/formatter';
import {Cast} from '../../../core/entities/cast.entity';
import {FlatList} from 'react-native-gesture-handler';
import {Actor} from '..';

interface Props {
  movie: FullMovie;
  cast: Cast[];
}

export const MovieDetails = ({movie, cast}: Props) => {
  return (
    <>
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text>⭐ {Math.round(movie.rating)}</Text>

          <Text style={{marginLeft: 10}}>{movie.genres.join(', ')}</Text>
        </View>

        <Text style={{fontSize: 13, marginTop: 10, fontWeight: 'bold'}}>
          Historia
        </Text>
        <Text style={{fontSize: 16}}>{movie.description}</Text>

        <Text style={{fontSize: 13, marginTop: 10, fontWeight: 'bold'}}>
          Presupuesto
        </Text>

        <Text style={{fontSize: 18}}>{Formatter.currency(movie.budget)}</Text>
      </View>

      <View style={{marginTop: 10, marginBottom: 50}}>
        <Text
          style={{
            fontSize: 13,
            marginVertical: 10,
            marginHorizontal: 20,
            fontWeight: 'bold',
          }}>
          Actores
        </Text>

        <FlatList
          data={cast}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <Actor actor={item} />}
        />
      </View>
    </>
  );
};
