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
  CALC_APPROVED_NUMERICAL,
  selectUser,
  CALC_PASSED_APPLICANT,
  CALC_PASSED_EP_APPLICANT,
  CALC_PASSED_COM_APPLICANT,
  CALC_AFPSAT_TAKERS
} from '../../redux/features/auth/authSlice';
import { Spinner } from '../loader/Loader';

// Icons
const icon1 = <FaUsers size={40} color="#fff" />;
const icon2 = <BiUserCheck size={40} color="#fff" />;
const icon3 = <BiUserMinus size={40} color="#fff" />;
const icon5 = <BiUserX size={40} color="#fff" />;

const ExamStats = () => {
  const dispatch = useDispatch();
  const {
    applicants,
    isLoading,
    passedUsers,
    passedEnlistment,
    passedCommission,
    afpsatTakers
  } = useSelector((state) => state.auth);
  const user = useSelector(selectUser);
  const proctorId = user?._id;
  console.log(proctorId);

  useEffect(() => {
    dispatch(CALC_VERIFIED_APPLICANT());
    dispatch(CALC_PERMITS_APPROVED());
    dispatch(CALC_APPROVED_ABSTRACT());
    dispatch(CALC_APPROVED_VERBAL());
    dispatch(CALC_APPROVED_NUMERICAL());
    dispatch(CALC_PASSED_APPLICANT());
    dispatch(CALC_PASSED_EP_APPLICANT());
    dispatch(CALC_PASSED_COM_APPLICANT());
    dispatch(CALC_AFPSAT_TAKERS());
  }, [dispatch, applicants]);

  return (
    <div className="user-summary">
      <h3 className="--mt">AFPSAT Results</h3>
      {isLoading && <Spinner />}
      <div className="info-summary">
        <InfoBox
          icon={icon1}
          title={'AFPSAT Passers'}
          count={passedUsers}
          bgColor={'card1'}
        />

        <InfoBox
          icon={icon2}
          title={'Enlistment'}
          count={passedEnlistment}
          bgColor={'card2'}
        />

        <InfoBox
          icon={icon3}
          title={'Commissionship'}
          count={passedCommission}
          bgColor={'card3'}
        />

        <InfoBox
          icon={icon5}
          title={'AFPSAT Takers'}
          count={afpsatTakers}
          bgColor={'card5'}
        />
      </div>
    </div>
  );
};

export default ExamStats;
