import axios from 'axios';
const MOVIE_BASE_URL = process.env.REACT_APP_MOVIE_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const USER_BASE_URL = process.env.REACT_APP_USER_BASE_URL;

const movieApi= axios.create(
    {
        baseURL:MOVIE_BASE_URL,
        params: {
            api_key: API_KEY
        }
    }
)

const userApi = axios.create(
    {
        baseURL:USER_BASE_URL
    }
)

export {movieApi,userApi};