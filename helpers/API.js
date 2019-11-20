const apiKey = '<YOUR API KEY';

export const fetchMovieList = async (query, pages, lang) => {
  const region = lang.toUpperCase();
  const queryApi =
    'https://api.themoviedb.org/3/search/movie?api_key=' +
    apiKey +
    '&query=' +
    query +
    '&sort_by=popularity.desc&page=' +
    pages +
    '&language=' +
    lang +
    '-' +
    region;
  let response = await fetch(queryApi);
  let result = await response.json();

  return result;
};

export const fetchMovieDetails = async (movieId, lang) => {
  const region = lang.toUpperCase();
  const queryApi =
    'https://api.themoviedb.org/3/movie/' +
    movieId +
    '?api_key=' +
    apiKey +
    '&language=' +
    lang +
    '-' +
    region +
    '&append_to_response=credits';
  let response = await fetch(queryApi);
  let result = await response.json();

  return result;
};
export const fetchProfile = async (name, lang) => {
  const region = lang.toUpperCase();
  const queryApi =
    'https://api.themoviedb.org/3/search/person/' +
    name +
    '?api_key=' +
    apiKey +
    '&language=' +
    lang +
    '-' +
    region;
  let response = await fetch(queryApi);
  let result = await response.json();

  return result;
};
export const fetchBiography = async (id, lang) => {
  const region = lang.toUpperCase();
  const queryApi =
    'https://api.themoviedb.org/3/person/' +
    id +
    '?api_key=' +
    apiKey +
    '&language=' +
    lang +
    '-' +
    region;
  let response = await fetch(queryApi);
  let result = await response.json();

  return result;
};
export const fetchPersonMovies = async (id, lang) => {
  const region = lang.toUpperCase();
  const queryApi =
    'https://api.themoviedb.org/3/person/' +
    id +
    '/combined_credits?api_key=' +
    apiKey +
    '&language=' +
    lang +
    '-' +
    region;
  let response = await fetch(queryApi);
  let result = await response.json();

  return result;
};
