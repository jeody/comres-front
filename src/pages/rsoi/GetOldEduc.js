import React, { useEffect, useState } from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { getEducDataAndUpdate, getMember, RESET_MEMBER } from '../../redux/features/rids/ridsSlice';
import setBodyColor from '../../setBodyColor';
import { useRef } from 'react';

const GetOldEduc = () => {
    useRedirectLoggedOutUser('/login');
    const { id, userId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, message, isError } = useSelector((state) => state.rids);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const hasInserted = useRef(false);
   

    useEffect(() => {
      // If already run, exit early
      if (hasInserted.current) return;

      // Mark as true immediately before the async call
      hasInserted.current = true;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://afprescom.afp/api_v1/educ/${userId}`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setData(data);

                dispatch(getEducDataAndUpdate({ id, data }));
 
            } catch (err) {
                // If it fails, you may want to reset the ref depending on your logic
                hasInserted.current = false;
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    // console.log(data);
      useEffect(() => {
        if (message === 'New education data updated!') {
          navigate(`/updateRids/${id}`);
        }
        if (isError === true) {
          setError(error);
          navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
      }, [message, navigate, dispatch]);

       setBodyColor({ color: '#fbfcfd' });
       
  return (
    <>
    {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    {isLoading && <Loader />}
    <div>
      <ul style={{ marginTop: '15px' }}>
        {data.map((educ) => (
          <>
            <li key={educ.id}>
              <strong style={{ color: 'black' }}>{educ.course}</strong>
            </li>
            <li>
              <strong style={{ color: 'black' }}>{educ.school}</strong>
            </li>
            <li>
              <strong style={{ color: 'black' }}>{educ.date_completed}</strong>
            </li>
            <li>
              <strong style={{ color: 'black' }}>{educ.verified}</strong>
            </li>
          </>
        ))}
      </ul>
    </div>
    </>
  )
}

export default GetOldEduc