import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../../redux/features/auth/authSlice';
import AddRids from './AddRids';
import { useNavigate } from 'react-router-dom';

const MyRids = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  // const soiInfo = member?.afpsn && member?.first_name && member?.last_name;
  
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  
  const isAddedMember = user?.isAddedMember;
  const id = user?.memberId;
    
  return (
    <>
      {isAddedMember ? (
        <>
          {navigate(`/${user.role}/updateRids/${id}`)}
        </>
      ) : (
        <AddRids />
      )}
    </>
  )
}

export default MyRids