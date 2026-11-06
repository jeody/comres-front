import { useEffect } from 'react';
import styles from './Reservist.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { getUser } from '../../redux/features/auth/authSlice';
import { getMember } from '../../redux/features/rids/ridsSlice';
import ReservistSidebar from '../../components/reservist/sidebar/ReservistSidebar';
import ReservistHome from '../../components/reservist/home/ReservistHome';
import ReservistProfile from '../../components/reservist/profile/ReservistProfile';
import ChangePassword from '../../components/reservist/changePassword/ChangePassword';
import UpdateRids from '../../pages/rids/UpdateRids';
import GetOldData from '../../pages/rsoi/GetOldData';
import ViewRsoi from '../../pages/rsoi/ViewRsoi';

const Reservist = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { member } = useSelector((state) => state.rids);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const id = user?.memberId;

  useEffect(() => {
    if (!id) return;
    dispatch(getMember(id));
  }, [dispatch, id]);

  const afpsn = member?.afpsn;
  
  return (
    <div className='--pad' style={{ minHeight: '80vh' }}>
        <div className={styles.reservist}>
            <div className={styles.navbar}>
                <ReservistSidebar id={id} afpsn={afpsn} />
            </div>
        <div className={styles.content}>
            <Routes>
                <Route path='home' element={<ReservistHome />} />
                <Route path='profile' element={<ReservistProfile/>} />
                <Route path='updateRids/:id' element={<UpdateRids />} />
                <Route path='viewSummaryOfInformation/:id' element={<ViewRsoi />} />
                <Route path='getOldData/:id/afpsn/:afpsn' element={<GetOldData />} />
                <Route path='change-password' element={<ChangePassword />} />
            </Routes>
        </div>
        </div>
    </div>
  )
}

export default Reservist