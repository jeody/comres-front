import React, { useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';
import { BiUserCheck, BiUserMinus, BiUserX } from 'react-icons/bi';
import InfoBox from '../infoBox/InfoBox';
import './UsersStats.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  CALC_VERIFIED_APPLICANT,
  CALC_PERMITS_APPROVED,
  CALC_APPROVED_ABSTRACT,
  CALC_APPROVED_VERBAL,
  CALC_APPROVED_NUMERICAL
} from '../../redux/features/auth/authSlice';
import { Spinner } from '../loader/Loader';
import NewLoader from '../../pages/profile/NewLoader';

// Icons
const icon1 = <FaUsers size={40} color="#fff" />;
const icon2 = <BiUserCheck size={40} color="#fff" />;
const icon3 = <BiUserMinus size={40} color="#fff" />;
const icon5 = <BiUserX size={40} color="#fff" />;

const ApplicantStats = () => {
  const dispatch = useDispatch();
  const {
    applicants,
    approvedPermits,
    abstractsApproved,
    verbalApproved,
    numericalApproved,
    isLoading
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(CALC_VERIFIED_APPLICANT());
    dispatch(CALC_PERMITS_APPROVED());
    dispatch(CALC_APPROVED_ABSTRACT());
    dispatch(CALC_APPROVED_VERBAL());
    dispatch(CALC_APPROVED_NUMERICAL());
  }, [dispatch, applicants]);

  return (
    <div className="user-summary">
      {isLoading && <NewLoader />}
      <h3 className="--mt">Applicant Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={icon1}
          title={'Approved Permits'}
          count={approvedPermits}
          bgColor={'card1'}
        />

        <InfoBox
          icon={icon2}
          title={'Abstract Reasoning'}
          count={abstractsApproved}
          bgColor={'card2'}
        />

        <InfoBox
          icon={icon3}
          title={'Verbal Reasoning'}
          count={verbalApproved}
          bgColor={'card3'}
        />

        <InfoBox
          icon={icon5}
          title={'Number Reasoning'}
          count={numericalApproved}
          bgColor={'card5'}
        />
      </div>
    </div>
  );
};

export default ApplicantStats;
