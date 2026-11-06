import React, { useEffect, useRef, useState } from 'react';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import setBodyColor from '../../setBodyColor';
import { getAdtDataAndUpdate, getMember, RESET_MEMBER } from '../../redux/features/rids/ridsSlice';
import Loader from '../../components/loader/Loader';

const GetOldAdt = () => {
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
                const response = await fetch(`http://localhost/www/v4/adt/${userId}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setData(data);

                dispatch(getAdtDataAndUpdate({ id, data }));
 
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
        if (message === 'New adt data updated!') {
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
        {data.map((adt) => (
          <>
            <li key={adt.id}>
              <strong style={{ color: 'black' }}>{adt.so_number}</strong>
            </li>
            <li>
              <strong style={{ color: 'black' }}>{adt.unit_assignment}</strong>
            </li>
            <li>
              <strong style={{ color: 'black' }}>{adt.date_start}</strong>
            </li>
            <li>
              <strong style={{ color: 'black' }}>{adt.date_end}</strong>
            </li>
          </>
        ))}
      </ul>
    </div>
    </>
  )
}

export default GetOldAdt