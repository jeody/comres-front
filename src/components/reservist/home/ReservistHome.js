import React, { useEffect, useState } from 'react'
import Loader from '../../loader/Loader';

const ReservistHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='homeBackground'>
          <h3>Dashboard ~</h3>
          <p>
            This is the reservist's <b>Dashboard Page</b>
          </p>
        </div>
      )}
    </>
  )
}

export default ReservistHome