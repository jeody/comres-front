import { useState } from 'react';
import styles from './Header.module.scss';
import rescomLogo from '../../assets/rescomLogo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { logout, RESET, selectUser } from '../../redux/features/auth/authSlice';
import { ShowOnLogin, ShowOnLogout } from '../../components/protect/hiddenLink';
import { useDispatch, useSelector } from 'react-redux';
import { UserName } from '../candidate/profile/CandidateProfile';

const logo = (
    <div className={styles.logo}>
      <Link to='/'>  
          <h2>RESCOM<span>&nbsp;AFP</span></h2>
      </Link>
    </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '');

const Header = () => {
  const user = useSelector(selectUser);
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPage, setScrollPage] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fixNavbar = () => {
    if (window.scrollY > 125) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixNavbar);  

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = async () => {
    dispatch(RESET());
    dispatch(logout());
    navigate("/");
  };

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        <Link to='/'>
        <img src={rescomLogo} alt='LogoImg' width='50' />
        </Link>
        {logo}

        <nav
          className={
            showMenu ? `${styles['show-nav']}` : `${styles['hide-nav']}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}`
                : `${styles['nav-wrapper']}`
            }
            onClick={hideMenu}
          ></div>

          <ul onClick={hideMenu}>
            <li className={styles['logo-mobile']}>
              {logo}
              <FaTimes size={22} color='#fff' onClick={hideMenu} />
            </li>
            {/* <li>
              <NavLink to='/' className={activeLink}>
                Home
              </NavLink>
            </li> */}
            {/* <li>
              <AdminLink>
                <NavLink to='/admin/home' className={activeLink}>
                  Admin
                </NavLink>
              </AdminLink>
            </li> */}
          </ul>

          <div className={styles['header-right']} onClick={hideMenu}>

                <ul>
                  <li>
                    <ShowOnLogout>
                        <NavLink to={"register"} className={activeLink}>
                          Register
                        </NavLink>
                    </ShowOnLogout>
                  </li>
                </ul>
                <ul>
                  <li>
                    <ShowOnLogin>
                        <Link to={`/${user?.role}/home`} style={{ textDecorationLine: "none" }}>
                          Home &nbsp;
                        </Link>
                    </ShowOnLogin>
                  </li>
                </ul>
                <ul>
                  <li>
                    <ShowOnLogin>
                        <Link to={`/${user?.role}/profile`} style={{ textDecorationLine: "none" }}>
                          <UserName />
                        </Link>
                    </ShowOnLogin>
                  </li>
                </ul>
                <ul>
                  <li>
                    <ShowOnLogin>
                        <Link to={"/"} onClick={logoutUser}>
                          Logout &nbsp;
                        </Link>
                    </ShowOnLogin>
                  </li>
                </ul>
                <ul>
                  <li>
                    <ShowOnLogout>
                            <button className='--btn --btn-primary' onClick={handleClick}>Login</button>
                    </ShowOnLogout>
                  </li>
                </ul>
          </div>
        </nav>

        <div className={styles['menu-icon']}>
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
