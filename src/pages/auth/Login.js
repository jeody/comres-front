import React, { useEffect, useState } from 'react';
import { BiLogIn } from "react-icons/bi";
import styles from './auth.module.scss';
import loginImg from '../../assets/army.png';
import { Link, useNavigate } from 'react-router-dom';
// import { FaGoogle } from 'react-icons/fa';
import Card from '../../components/card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail } from '../../redux/features/auth/authService';
import { login, loginWithGoogle, RESET, selectUser, sendLoginCode, sendOtpCode } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';
import PasswordInput from '../../components/passwordInput/PasswordInput';
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: ""
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;
  const user = useSelector(selectUser);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, isError, twoFactor, requireOtp } =
    useSelector((state) => state.auth);

      const loginUser = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
          return toast.error("All fields are required");
        }
    
        if (!validateEmail(email)) {
          return toast.error("Please enter a valid email");
        }
    
        const userData = {
          email,
          password
        };
    
        // console.log(userData);
        await dispatch(login(userData));
      };
    
  const userPath = user?.role;

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate(`/${userPath}/profile`);
    }

    if (isError && twoFactor) {
      dispatch(sendLoginCode(email));
      navigate(`/loginWithCode/${email}`);
    }

    //enforced 2FA, send OTP code and navigate to login with otp page
    if (isError && requireOtp) {
      dispatch(sendOtpCode(email));
      navigate(`/loginWithOtp/${email}`);
     }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate, userPath, isError, twoFactor, requireOtp, email]);

  const googleLogin = async (credentialResponse) => {
    console.log(credentialResponse);
    await dispatch(
      loginWithGoogle({ userToken: credentialResponse.credential })
    );
  };

  return (
    <section className={`container ${styles.auth}`}>
      {isLoading && <Loader />}

      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="#999" />
          </div>
          <h2>Login</h2>
          <form onSubmit={loginUser}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <PasswordInput
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
            <div className={styles.links}>
              <Link to='/reset'>Reset Password</Link>
            </div>
            <p>-- or --</p>
          </form>
          {/* <button className='--btn --btn-danger --btn-block'>
            <FaGoogle color='#fff' /> Login With Google
          </button> */}
          <div className="--flex-center">
            {/* <button className='--btn --btn-google'>Login With Google</button> */}
            <GoogleLogin
              onSuccess={googleLogin}
              onError={() => {
                console.log("Login Failed");
                toast.error("Login Failed");
              }}
            />
          </div>
          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p> &nbsp; Don't have an account? &nbsp;</p>
            <Link to='/register'>Register</Link>
          </span>
        </div>
      </Card>
      <div>&nbsp;</div>

      <div className={styles.img}>
        <img src={loginImg} alt='Login' width='290' />
      </div>
      
    </section>
  );
};

export default Login;
