import React, { useEffect, useState } from 'react';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataAndUpdate, getMember, RESET_MEMBER } from '../../redux/features/rids/ridsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';

const GetOldData = () => {
    useRedirectLoggedOutUser('/login');
    const { id, afpsn } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, message, isError } = useSelector((state) => state.rids);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://afprescom.afp/api/reservist/${afpsn}`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setData(data);
                dispatch(getDataAndUpdate({ id, data }));
            } catch (err) {
                setError(err.message);
                navigate(`/reservist/updateRids/${id}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [afpsn]);

    // console.log(data);
      useEffect(() => {
        if (message === 'New data update!') {
          navigate(`/reservist/updateRids/${id}`);
        }
        if (isError === true) {
          setError(error);
          navigate(`/reservist/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
      }, [message, navigate, dispatch]);

  return (
    <>
    {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    {isLoading && <Loader />}
    <div>
      <ul style={{ marginTop: '15px' }}>
        {data.map((user) => (
          <>
            <li key={user.id}>
              <strong style={{ color: 'black' }}>{user.name}</strong>
            </li>
            <li>
              <strong style={{ color: 'black' }}>{user.first_name}</strong>
            </li>
            <li>
              <strong style={{ color: 'black' }}>{user.middle_name}</strong>
            </li>
            <li>
              <strong style={{ color: 'black' }}>{user.last_name}</strong>
            </li>
          </>
        ))}
      </ul>
    </div>
    </>
  )
}

export default GetOldData