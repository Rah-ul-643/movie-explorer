import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Home from './pages/home';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Login from './pages/login';
import Register from './pages/register';
import Movies from './pages/movies';
import MoviePage from './pages/moviePage';
import Watchlist from './pages/watchlist';

import {movieApi} from './apis';
import Missing from './components/Missing';



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') ? true : false);
  const [movies,setMovies] = useState([]);

  useEffect(() => {
  
    const makeRequest = async () => {
      try {

        const response = await movieApi.get('/trending/movie/day');
        if (response.data) {
          setMovies(response.data.results);
          console.log(response.data.results);
        }

      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();

  }, [isLoggedIn])


  return (
    <div className="App">
      <Nav
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies movies={movies} setMovies={setMovies} isLoggedIn={isLoggedIn}/> } />
        <Route path='/movies/:id' element={<MoviePage movies={movies} setMovies={setMovies}/>} />
        <Route path='/login' element={isLoggedIn ? <Home /> : <Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/watchlist' element={isLoggedIn ? <Watchlist/> : <Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path='*' element={<Missing text={"content"} /> } />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
