import {useEffect, useState} from 'react';
import {Movie} from '../../core/entities/movie.entity';
import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';

let popularPage = 1;
let topRatedPage = 1;
let upcomingPage = 1;

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

  const popularNextPage = async () => {
    popularPage += 1;

    const popularMovies = await UseCases.PopularUseCase(movieDBFetcher, {
      page: popularPage,
    });

    setPopular([...popular, ...popularMovies]);
  };

  const topRatedNextPage = async () => {
    topRatedPage += 1;

    const topRatedMovies = await UseCases.TopRatedUseCase(movieDBFetcher, {
      page: topRatedPage,
    });

    setTopRated([...topRated, ...topRatedMovies]);
  };

  const upcomingNextPage = async () => {
    upcomingPage += 1;

    const upcomingMovies = await UseCases.UpcomingUseCase(movieDBFetcher, {
      page: upcomingPage,
    });

    setUpcoming([...upcoming, ...upcomingMovies]);
  };

  return {
    nowPlaying,
    upcoming,
    topRated,
    popular,
    isLoading,
    popularNextPage,
    topRatedNextPage,
    upcomingNextPage,
  };
};
