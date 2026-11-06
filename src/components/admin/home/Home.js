import React, { useEffect, useState } from 'react';
import { Spinner } from '../../loader/Loader';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='homeBackground'>
          <h3>Dashboard ~</h3>
          <p>
            This is the admin's <b>Dashboard Page</b>
          </p>
          <br />
          <div>&nbsp;</div>
        </div>
      )}
    </>
  );
};

export default Home;
