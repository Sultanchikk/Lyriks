import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '7789f587bcmshf673095c888b885p135b99jsn51402eff3b29');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/world' }),
    getSongsByGenre: builder.query({ query: (genre) => `/charts/genre-world?genre_code=${genre}` }),
    getSongDetails: builder.query({ query: ({ songId }) => `/tracks/details?track_id=${songId}` }),
    getSongRelated: builder.query({ query: ({ songId }) => `/tracks/related?track_id=${songId}` }),
    getSongByCountry: builder.query({
      query: (countryCount) =>
        `/charts/country?country_code=${countryCount !== 'KG' ? countryCount : 'RU'}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetSongByCountryQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;
