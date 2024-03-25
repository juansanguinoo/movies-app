import {useEffect, useState} from 'react';
import {Movie} from '../../core/entities/movie.entity';
import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    await Promise.all([
      UseCases.NowPlayingUseCase(movieDBFetcher),
      UseCases.UpcomingUseCase(movieDBFetcher),
      UseCases.TopRatedUseCase(movieDBFetcher),
      UseCases.PopularUseCase(movieDBFetcher),
    ])
      .then(responses => {
        const [
          nowPlayingResponse,
          upcomingResponse,
          topRatedResponse,
          popularResponse,
        ] = responses;

        setNowPlaying(nowPlayingResponse);
        setUpcoming(upcomingResponse);
        setTopRated(topRatedResponse);
        setPopular(popularResponse);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los datos de las películas:', error);
      });
  };

  return {
    nowPlaying,
    upcoming,
    topRated,
    popular,
    isLoading,
  };
};
