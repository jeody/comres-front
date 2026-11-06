const { useSelector } = require('react-redux');
const {
  selectIsLoggedIn,
  selectUser,
} = require('../../redux/features/auth/authSlice');

export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};

export const AdminLink = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  if (isLoggedIn && user?.role === 'admin') {
    return <>{children}</>;
  }
  return null;
};

export const PsychologistLink = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  if (isLoggedIn && user?.role === 'psychologist') {
    return <>{children}</>;
  }
  return null;
};

export const PyschometLink = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  if (isLoggedIn && user?.role === 'psychometrician') {
    return <>{children}</>;
  }
  return null;
};

export const ReservistLink = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  if (isLoggedIn && user?.role === 'reservist') {
    return <>{children}</>;
  }
  return null;
};
