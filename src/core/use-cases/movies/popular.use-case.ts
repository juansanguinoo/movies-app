import {HttpAdapter} from '../../../config/adapters/http/http-adapter';
import {MoviesResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import {Movie} from '../../entities/movie.entity';

interface Options {
  page?: number;
  limit?: number;
}

export const PopularUseCase = async (
  fetcher: HttpAdapter,
  options?: Options,
): Promise<Movie[]> => {
  try {
    const response = await fetcher.get<MoviesResponse>('/popular', {
      params: {
        page: options?.page || 1,
      },
    });

    return response.results.map(result =>
      MovieMapper.fromMovieDBResultToEntity(result),
    );
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching popular movies');
  }
};
