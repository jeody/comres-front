import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './auth.module.scss';
import Card from '../../components/card/Card';
import { GrInsecure } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  RESET,
  loginWithOtp,
  sendOtpCode,
} from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

const LoginWithOtp = () => {
  const [otpCode, setOtpCode] = useState('');
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const sendUserOtpCode = async () => {
    await dispatch(sendOtpCode(email));
    await dispatch(RESET());
  };

  const loginUserWithOtp = async (e) => {
    e.preventDefault();

    if (otpCode === '') {
      return toast.error('Please fill in the One-Time-Pin code');
    }

    if (otpCode.length !== 6) {
      return toast.error('OTP code must be 6 characters');
    }

    const code = {
      otpCode,
    };

    await dispatch(loginWithOtp({ code, email }));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate('/candidate/profile');
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <GrInsecure size={35} color='#999' />
          </div>

          <h2>Security Verification</h2>

          <form onSubmit={loginUserWithOtp}>
            <input
              type='text'
              placeholder='Enter OTP code...'
              name='otpCode'
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
            />

            <button type='submit' className='--btn --btn-primary --btn-block'>
              Proceed To Login
            </button>
            <span className='--flex-center'>
              Check your email for OTP code
            </span>
            <div className={styles.links}>
              <p>
                <Link to='/'>- Home</Link>
              </p>

              <p
                onClick={sendUserOtpCode}
                className='v-link  --color-primary'
              >
                <b>Resend Code</b>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default LoginWithOtp