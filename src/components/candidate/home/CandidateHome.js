import React, { useState, useEffect } from 'react'
import Loader from '../../loader/Loader';

const CandidateHome = () => {
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
            This is the candidate's <b>Dashboard Page</b>
          </p>
        </div>
      )}
    </>
  )
}

export default CandidateHome