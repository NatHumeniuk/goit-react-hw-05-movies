import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';

const options = {
  method: 'GET',
  params: { language: 'en-US' },
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NTljM2Y0ZGE4NGY5ZjdlNjZkYTlmZWU3YjdlZTI4YSIsInN1YiI6IjY1YTI3M2MwNDk3NTYwMDEyYjliMGYxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N_RsT6vg_3TxBwB_9Hg97rMnyy5atcfwLloiKbQ4kSE',
  },
};

export const requestMoviesTrend = async () => {
  const url = `${BASE_URL}trending/movie/day?`;
  const response = await axios.get(url, options);
  return response.data.results;
};

export const requestMovieById = async movieId => {
  const url = `${BASE_URL}movie/${movieId}?`;
  const response = await axios.get(url, options);
  return response.data;
};
export const requestMovieCast = async movieId => {
  const url = `${BASE_URL}movie/${movieId}/credits?`;
  const response = await axios.get(url, options);
  return response.data.cast;
};
export const requestMovieReview = async movieId => {
  const url = `${BASE_URL}movie/${movieId}/reviews?`;
  const response = await axios.get(url, options);
  return response.data.results;
};
export const requestMovieByQuery = async searchQuery => {
  const url = `${BASE_URL}/search/movie?query=${searchQuery}?`;
  const response = await axios.get(url, options);
  return response.data.results;
};
