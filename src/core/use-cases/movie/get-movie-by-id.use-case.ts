import {HttpAdapter} from '../../../config/adapters/http/http-adapter';
import {GetMovieById} from '../../../infrastructure/interfaces/get-movie-db.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import {FullMovie} from '../../entities/movie.entity';

export const getMovieByIdUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<FullMovie> => {
  try {
    const response = await fetcher.get<GetMovieById>(`/${movieId}`);

    return MovieMapper.fromMovieDBToFullMovieEntity(response);
  } catch (error) {
    throw new Error('Error getting movie by id');
  }
};
