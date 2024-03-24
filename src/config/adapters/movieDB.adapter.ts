import {AxiosAdapter} from './http/axios-adapter';

export const movieDBFetcher = new AxiosAdapter({
  baseUrl: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '197f438e07229f11728180da2cce97dd',
    language: 'es',
  },
});
