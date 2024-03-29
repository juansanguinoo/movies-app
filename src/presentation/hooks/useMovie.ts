/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import * as UseCases from '../../core/use-cases';
import {FullMovie} from '../../core/entities/movie.entity';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';
import {Cast} from '../../core/entities/cast.entity';

export const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<FullMovie>();
  const [cast, setCast] = useState<Cast[]>([]);

  useEffect(() => {
    loadMovie();
  }, [movieId]);

  const loadMovie = async () => {
    setIsLoading(true);
    await Promise.all([
      UseCases.getMovieByIdUseCase(movieDBFetcher, movieId),
      UseCases.getMovieCastUseCase(movieDBFetcher, movieId),
    ])
      .then(responses => {
        const [movieResponse, castResponse] = responses;

        setMovie(movieResponse);
        setCast(castResponse);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los datos de las películas:', error);
      });
  };

  return {
    isLoading,
    movie,
    cast,
  };
};
