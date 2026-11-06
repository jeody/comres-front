import React from 'react'
import { Routes, Route } from 'react-router-dom';
import CandidateSidebar from '../../components/candidate/sidebar/CandidateSidebar';
import styles from './Candidate.module.scss';
import CandidateHome from '../../components/candidate/home/CandidateHome';
import CandidateProfile from '../../components/candidate/profile/CandidateProfile';
import MyRids from '../../components/candidate/rids/MyRids';
import ChangePassword from '../../components/candidate/changePassword/ChangePassword';
import PsgcAddress from '../../components/candidate/changeAddress/PsgcAddress';

const Candidate = () => {
  return (
    <div className='--pad' style={{ minHeight: '80vh' }}>
        <div className={styles.candidate}>
            <div className={styles.navbar}>
                <CandidateSidebar />
            </div>
            <div className={styles.content}>
                <Routes>
                    <Route path='home' element={<CandidateHome />} />
                    <Route path='profile' element={<CandidateProfile />} />
                    <Route path='rids' element={<MyRids />} />
                    <Route path='change-password' element={<ChangePassword />} />
                    <Route path='change-psgc-address' element={<PsgcAddress />} />
                </Routes>
            </div>
        </div>
    </div>
  )
}

export default Candidate