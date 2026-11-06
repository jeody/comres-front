import React, { useEffect } from 'react';
import './PageMenu.scss';
import { NavLink } from 'react-router-dom';
import {
  PyschometLink,
  PsychologistLink,
  AdminLink,
  ReservistLink
} from '../protect/hiddenLink';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/features/auth/authSlice';

const PageMenu = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { member } = useSelector((state) => state.rids);
  const isAddedMember = user?.isAddedMember;
  const soiInfo = member?.afpsn && member?.first_name && member?.last_name;

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const id = user?.memberId;

  return (
    <div>
      <nav className="--bg-primary --p --mb">
        <ul className="home-links">
          <li>
            <NavLink to="/profile">Profile</NavLink> &nbsp; &middot;
          </li>
          <ReservistLink>
          <li>
            {isAddedMember ? (
              <NavLink to={`/updateRids/${id}`}>RIDS</NavLink>
            ) : (
              <NavLink to="/addRids">RIDS</NavLink>
            )}
            &nbsp; &middot;
          </li>
          <li>
            {isAddedMember && soiInfo ? (
              <NavLink to={`/viewSummaryOfInformation/${id}`}>RSOI</NavLink>
            ) : (
              ''
            )}
          </li>
          </ReservistLink>
          <PyschometLink>
            <li>
              <NavLink to="/applicants">Examinees</NavLink> &nbsp;
            </li>
            <li>
              <NavLink to="/viewResults">View Results</NavLink> &nbsp;
            </li>
            <li>
              <NavLink to="/changeSignatories">IRF Signatories</NavLink> &nbsp;
            </li>
            <li>
              <NavLink to="/verifyBarcode">Verify Barcode</NavLink> &nbsp;
            </li>
          </PyschometLink>
          <PsychologistLink>
            <li>
              <NavLink to="/abstractQuestions">AbstractQuestions</NavLink>{' '}
              &nbsp; &middot;
            </li>
            <li>
              <NavLink to="/numberQuestions">NumberQuestions</NavLink> &nbsp;
              &middot;
            </li>

            <li>
              <NavLink to="/verbalQuestions">VerbalQuestions</NavLink> &nbsp;
              &middot;
            </li>
          </PsychologistLink>
          <AdminLink>
            <li>
              <NavLink to="/users">Users</NavLink>&nbsp;
            </li>
            <li>
              &middot; &nbsp; &nbsp;
              <NavLink to="/rids">RIDS</NavLink> &nbsp;
            </li>
          </AdminLink>
        </ul>
      </nav>
    </div>
  );
};

export default PageMenu;
