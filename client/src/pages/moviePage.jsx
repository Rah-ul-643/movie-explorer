import {movieApi} from '../apis';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/moviePage.css';
import Missing from '../components/Missing';

const MoviePage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await movieApi.get(`/movie/${id}`);
                setMovie(response.data);
                console.log(response.data);

            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [id])

    return (
        movie !== null ?
            <div className='main MoviePage'>
                <div className="backdrop" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})` }}>

                    <div className="content">
                        <h1>{movie.title}</h1>
                        <p className="tagline">"{movie.tagline}"</p>
                    </div>

                </div>

                <div className='content-section'>
                    <h1>{movie.title}</h1>
                    <div className="movie-container">  
                        <div className="movie-poster">
                            <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} />
                        </div>
                        <div className="movie-details">
                            <h2>Details</h2>
                            <ul>
                                <li><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</li>
                                <li><strong>Runtime:</strong> {movie.runtime} minutes</li>
                                <li><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</li>
                                <li><strong>Language:</strong> {movie.spoken_languages.map(lang => lang.english_name).join(', ')}</li>
                                <li><strong>Country:</strong> {movie.production_countries.map(country => country.name).join(', ')}</li>
                                <li><strong>Status:</strong> {movie.status}</li>
                                <li><strong>Budget:</strong> ${movie.budget.toLocaleString()}</li>
                                <li><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</li>
                                <li><strong>Rating:</strong> {movie.vote_average} ({movie.vote_count} votes)</li>
                            </ul>

                        </div>
                    </div>
                    <div className='detail-section'>
                        <h2>Overview</h2>
                        <p>{movie.overview}</p>
                    </div>
                    {/* <div className='detail-section'>
                        <h2>Stream On:</h2>
                        <ul>
                            {movie.providers.map(provider => (
                                <li key={provider.provider_id}>
                                    {provider.provider_name}
                                </li>
                            ))}
                        </ul>
                    </div> */}
                </div>
            </div>
            :
            <Missing text={'details'} />
    )
}

export default MoviePage;