import {HttpAdapter} from '../../../config/adapters/http/http-adapter';
import {MoviesResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import type {Movie} from '../../entities/movie.entity';

export const NowPlayingUseCase = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const response = await fetcher.get<MoviesResponse>('/now_playing');

    return response.results.map(result =>
      MovieMapper.fromMovieDBResultToEntity(result),
    );
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching now playing movies');
  }
};
