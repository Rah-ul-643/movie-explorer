import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './css/movies.css';
import { movieApi, userApi } from '../apis';
import Missing from '../components/Missing';
import toast from 'react-hot-toast';


const Movies = ({ movies, setMovies, isLoggedIn }) => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('Popular');
    const [filter, setFilter] = useState({ category: 'popular', sortBy: 'none' });
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered,setIsHovered] = useState(false);

    useEffect(() => {
        const makeRequest = async () => {

            switch (filter.category) {
                case 'popular':
                    setTitle('Popular');
                    break;

                case 'now_playing':
                    setTitle('Latest');
                    break;

                case 'top_rated':
                    setTitle('Top-Rated');
                    break;

                case 'upcoming':
                    setTitle('Upcoming');
                    break;

                default:
                    break;
            }

            try {

                const response = await movieApi.get(`/movie/${filter.category}`);
                if (response.data) {
                    const results = response.data.results;
                    let sortedResults = [];

                    if (filter.sortBy === 'name') {
                        sortedResults = results.sort((a, b) => a.title.localeCompare(b.title))
                    }
                    else if (filter.sortBy === 'year') {
                        sortedResults = results.sort((a, b) => {
                            const dateA = new Date(a.release_date);
                            const dateB = new Date(b.release_date);
                            return (dateB - dateA);
                        })
                    }
                    else if (filter.sortBy === 'rating') {
                        sortedResults = results.sort((a, b) => b.vote_average - a.vote_average);
                    }
                    else sortedResults = results;


                    console.log(results);
                    setMovies(sortedResults);

                }

            } catch (error) {
                console.log(error);
            }
        }
        makeRequest();

    }, [filter, setMovies])

    const addToWachlist = async (id) => {
        try {
            const movie = movies.find(movie => movie.id == id);
            const response = await userApi.post('/watchlist/add', { username: localStorage.getItem('user').username, movie });
            console.log(response.data);
            toast.success(response.data.message);

        } catch (error) {
            console.log(error);
            toast.error("Unable to add to watchlist!!!");
        }

    }


    const HandleSearch = async (e) => {
        setSearch(e.target.value);
        const params = { query: e.target.value }
        const response = await movieApi.get('/search/movie', { params });
        setSearchResults(response.data.results.slice(0,3));
        console.log(response.data.results);

    }
    return (
        movies.length ?

            <div className='Movies'>
                <div className={'search-bar'}>
                    <input type="text" placeholder="Search Movies..." 
                    value={search} 
                    onChange={HandleSearch} 
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    />
                </div>
                <div className={isFocused || isHovered ? 'search-results' : 'search-results hidden' } 
                    onMouseEnter={() => setIsHovered(true)}  
                    onMouseLeave={() => setIsHovered(false)}
                    >
                        
                    <ul>
                        {searchResults.map(movie => (
                            <li key={movie.id}>
                                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="" />
                                <Link to={`/movies/${movie.id}`}>
                                    {movie.title} ({movie.original_language.toUpperCase()}) <p>({movie.release_date.slice(0, 4)})</p>
                                </Link>
                                <p><i class="fa-solid fa-star" style={{ "color": "#FFD43B" }}></i> {movie.vote_average.toFixed(1)}</p>

                            </li>
                        ))}
                    </ul>
                </div>
                <h1 className='title'>{title} Movies</h1>

                <div className='filter'>
                    <h2>Filter</h2>
                    <div className='filter-item'>
                        <label htmlFor="category">Category</label>
                        <select
                            name="category"
                            value={filter.category}
                            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                        >
                            <option value="now_playing">Latest</option>
                            <option value="popular">Popular</option>
                            <option value="top_rated">Top Rated</option>
                            <option value="upcoming">Upcoming</option>
                        </select>
                    </div>
                    <div className='filter-item'>
                        <label htmlFor="category">Sort by</label>
                        <select
                            name="category"
                            value={filter.sortBy}
                            onChange={(e) => setFilter({ ...filter, sortBy: e.target.value })}
                        >
                            <option value="rating">Rating</option>
                            <option value="name">Name (A-Z)</option>
                            <option value="year">Year</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>

                <div className='container'>

                    {movies.map((movie, index) => {

                        return (

                            <div key={movie.id} className='card'>
                                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} onClick={() => navigate(`/movies/${movie.id}`)} className='poster' alt="" />
                                <div>
                                    <h3><Link to={`/movies/${movie.id}`}>{movie.title.length > 20 ? movie.title.slice(0, 15) + "..." : movie.title}</Link></h3>
                                </div>

                                <div className='details'>
                                    <p>{movie.release_date.slice(0, 4)}</p>
                                    <p><i class="fa-solid fa-star" style={{ "color": "#FFD43B" }}></i> {movie.vote_average.toFixed(1)}</p>
                                    <button onClick={() => isLoggedIn ? addToWachlist(movie.id) : navigate('/login')}>
                                        <i className="fa-regular fa-bookmark" ></i>
                                    </button>
                                </div>
                            </div>
                        )
                    }
                    )}

                </div>
            </div>

            :

            <Missing text={"movies"} />

    )
}

export default Movies;  