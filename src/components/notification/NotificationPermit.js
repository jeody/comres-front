import React from 'react';
import './Notification.scss';
import { useNavigate } from 'react-router-dom';

const NotificationPermit = () => {
  const navigate = useNavigate();

  const uploadLink = async () => {
    navigate('/permit');
  };

  return (
    <div className='container'>
      <div className='alert'>
        <p>
          <b>Message: </b> &nbsp;
        </p>
        <p>
          You need to upload Examination Permit before proceeding to AFP Service
          Aptitude Test.
        </p>{' '}
        &nbsp;
        <p className='v-link' onClick={uploadLink}>
          <b>Upload Link</b>
        </p>
      </div>
    </div>
  );
};

export default NotificationPermit;
