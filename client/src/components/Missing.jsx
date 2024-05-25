import React from 'react';
import { Link } from 'react-router-dom';
import './css/Missing.css';

const Missing = ({ text }) => {
  return (
    <div className='Parent Boards'>
      <main className='Missing'>
        <h2>No {text} to display</h2>
        <p>Explore <Link to='/movies'>Movies</Link></p>
        <p> Visit Our <Link to='/'>HomePage</Link> </p>
      </main>
    </div>
  );
};

export default Missing;
