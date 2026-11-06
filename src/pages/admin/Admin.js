import React from 'react';
import styles from './Admin.module.scss';
import Sidebar from '../../components/admin/sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Home from '../../components/admin/home/Home';
import Profile from '../../components/admin/profile/Profile';
import Sub from '../../components/admin/subscription/Sub';
import { AdminLink } from '../../components/protect/hiddenLink';
import Users from '../../components/admin/users/Users';
import ChangeAdminPassword from '../../components/admin/changePassword/ChangeAdminPassword';

const Admin = () => {
  return (
    <div className='--pad' style={{ minHeight: '80vh' }}>
      <div className={styles.admin}>
        <div className={styles.navbar}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <Routes>
            <Route path='home' element={
              <AdminLink>
                <Home />
              </AdminLink>
              } />
            <Route path='profile' element={
              <AdminLink>
                <Profile />
              </AdminLink>
            } />
            <Route path='account' element={
              <AdminLink>
                <Sub />
              </AdminLink>
            } />
            <Route path='users' element={
              <AdminLink>
                <Users />
              </AdminLink>
            } />
            <Route path='change-password' element={
              <AdminLink>
                <ChangeAdminPassword />
              </AdminLink>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
