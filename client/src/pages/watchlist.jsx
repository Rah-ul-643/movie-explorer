import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './css/movies.css';
import {userApi} from '../apis';

import Missing from '../components/Missing';
import toast from 'react-hot-toast';


const Watchlist = () => {
    const navigate = useNavigate();

    const [watchlist,setWatchlist] = useState([]);

    useEffect(() => {
        console.log("inside watchlist page");
        const makeRequest = async () => {

            try {
                const params= {username: JSON.parse(localStorage.getItem('user')).username}
                const response = await userApi.get('/watchlist',{params});
                if (response.data) {
                    const results = response.data;
                    console.log(results);
                    setWatchlist(results);
                }

            } catch (error) {
                console.log(error);
            }
        }
        makeRequest();

    }, [])


    const removeFromWatchlist = async (id) => {
        try {
            const params= {username: JSON.parse(localStorage.getItem('user')).username}
            const response = await userApi.delete(`/watchlist/delete/${id}`, {params}); 

            if (response.data) {
                console.log(response.data);
                const updatedWatchlist = watchlist.filter(movie => movie.id != id);
                setWatchlist(updatedWatchlist);
                toast.success("Removed from watchlist");
            }

        } catch (error) {
            console.log(error);
            toast.error("Unable to remove from watchlist");
        }
    }

    return (
        watchlist.length ?

            <div className='Watchlist'>
                <h1 className='title'> My Watchlist </h1>

                <div className='container'>

                    {watchlist.map((movie) => {

                        return (

                            <div key={movie.id} className='card'>
                                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} onClick={() => navigate(`/movies/${movie.id}`)} className='poster' alt="" />
                                <div>
                                    <h3><Link to={`/movies/${movie.id}`}>{movie.title.length > 20 ? movie.title.slice(0, 15) + "..." : movie.title}</Link></h3>
                                </div>

                                <div className='details'>
                                    <p>{movie.release_date.slice(0, 4)}</p>
                                    <p><i className="fa-solid fa-star" style={{ "color": "#FFD43B" }}></i> {movie.vote_average.toFixed(1)}</p>
                                    <button onClick={() => removeFromWatchlist(movie.id)}>
                                        <i className="fa-solid fa-trash" ></i>
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

export default Watchlist;  