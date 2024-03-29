import {HttpAdapter} from '../../../config/adapters/http/http-adapter';
import {MovieCastResponse} from '../../../infrastructure/interfaces/movie-db-cast.responses';
import {CastMapper} from '../../../infrastructure/mappers/cast.mapper';
import {Cast} from '../../entities/cast.entity';

export const getMovieCastUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<Cast[]> => {
  try {
    const {cast} = await fetcher.get<MovieCastResponse>(`/${movieId}/credits`);

    return cast.map(actor => CastMapper.fromMovieDBCastToEntity(actor));
  } catch (error) {
    throw new Error('Cannot get movie cast.');
  }
};
