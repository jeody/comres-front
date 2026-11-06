import React, { useEffect } from 'react';
import Candidate from './pages/candidate/Candidate';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import NotFound from './pages/404/NotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Reset from './pages/auth/Reset';
import Admin from './pages/admin/Admin';
import Verify from './pages/auth/Verify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginStatus, getUser, selectIsLoggedIn, selectUser } from './redux/features/auth/authSlice';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginWithOtp from './pages/auth/LoginWithOtp';
import LoginWithCode from './pages/auth/LoginWithCode';
import Forgot from './pages/auth/Forgot';
import Reservist from './pages/reservist/Reservist';
import UpdateRids from './pages/rids/UpdateRids';
import AddEduc from './pages/rids/AddEduc';
import EditEduc from './pages/rids/EditEduc';
import EducPdf from './pages/rids/EducPdf';
import ViewCoursePdf from './pages/rids/ViewCoursePdf';
import GetOldEduc from './pages/rsoi/GetOldEduc';
import AddTraining from './pages/rids/AddTraining';
import EditTraining from './pages/rids/EditTraining';
import TrainingPdf from './pages/rids/TrainingPdf';
import ViewTrainingPdf from './pages/rids/ViewTrainingPdf';
import GetOldTraining from './pages/rsoi/GetOldTraining';
import AddActiveDuty from './pages/rids/AddActiveDuty';
import EditActive from './pages/rids/EditActive';
import ActiveDutyPdf from './pages/rids/ActiveDutyPdf';
import ViewActivePdf from './pages/rids/ViewActivePdf';
import GetOldAdt from './pages/rsoi/GetOldAdt';
import AddDesignation from './pages/rids/AddDesignation';
import EditDesignation from './pages/rids/EditDesignation';
import DesignationPdf from './pages/rids/DesignationPdf';
import ViewDesignationPdf from './pages/rids/ViewDesignationPdf';
import GetOldDesignation from './pages/rsoi/GetOldDesignation';
import AddAward from './pages/rids/AddAward';
import EditAward from './pages/rids/EditAward';
import AwardPdf from './pages/rids/AwardPdf';
import ViewAwardPdf from './pages/rids/ViewAwardPdf';
import GetOldAwards from './pages/rsoi/GetOldAwards';
import GetOldDependents from './pages/rsoi/GetOldDependents';
import GetOldPromotion from './pages/rsoi/GetOldPromotion';
import GetOldActivity from './pages/rsoi/GetOldActivity';
import AddDependent from './pages/rids/AddDependent';
import EditDependent from './pages/rids/EditDependent';
import DependentPdf from './pages/rids/DependentPdf';
import ViewDependentPdf from './pages/rids/ViewDependentPdf';
import AddPromotion from './pages/rids/AddPromotion';
import EditPromotion from './pages/rids/EditPromotion';
import PromotionPdf from './pages/rids/PromotionPdf';
import ViewPromotionPdf from './pages/rids/ViewPromotionPdf';
import AddActivity from './pages/rids/AddActivity';
import AddDerogatory from './pages/rids/AddDerogatory';
import EditActivity from './pages/rids/EditActivity';
import ActivityPdf from './pages/rids/ActivityPdf';
import ViewActivityPdf from './pages/rids/ViewActivityPdf';
import ViewRsoi from './pages/rsoi/ViewRsoi';
import PrintRids from './pages/rsoi/PrintRids';
axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <ToastContainer />
          <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path="/forgot" element={<Forgot />} />
              <Route path="/resetPassword/:resetToken" element={<Reset />} />
              <Route path="/loginWithCode/:email" element={<LoginWithCode />} />
              <Route path='/loginWithOtp/:email' element={<LoginWithOtp />} />
              <Route path='/register' element={<Register />} />
              <Route
                path="/verify/:verificationToken"
                element={<Verify />}
              />
              <Route path='/reset' element={<Reset />} />
              <Route path='/admin/*' element={<Admin />} />
              <Route path='/candidate/*' element={<Candidate />} />
              <Route path='/reservist/*' element={<Reservist />} />
              <Route path="/updateRids/:id" element={<UpdateRids />} />

              <Route path="/addEduc/:id" element={<AddEduc />} />
              <Route path="/editEduc/:parentId/educ/:educId" element={<EditEduc /> } />
              <Route path="/educPdf/:parentId/educ/:educId" element={<EducPdf /> } />
              <Route path="/viewCoursePdf/:parentId/educ/:educId" element={<ViewCoursePdf /> } />
              <Route path="/getOldEduc/:id/userId/:userId" element={<GetOldEduc /> } />

              <Route path="/addTraining/:id" element={<AddTraining /> } />
              <Route path="/editTraining/:parentId/train/:trainId" element={<EditTraining /> } />
              <Route path="/trainPdf/:parentId/train/:trainId" element={<TrainingPdf /> } />
              <Route path="/viewTrainingPdf/:parentId/train/:trainId" element={<ViewTrainingPdf /> } />
              <Route path="/getOldTraining/:id/userId/:userId" element={<GetOldTraining /> } />

              <Route path="/addActiveDuty/:id" element={<AddActiveDuty /> } />
              <Route path="/editActive/:parentId/active/:activeId" element={<EditActive /> } />
              <Route path="/activeDutyPdf/:parentId/active/:activeId" element={<ActiveDutyPdf /> } />
              <Route path="/viewActivePdf/:parentId/active/:activeId" element={<ViewActivePdf /> } />
              <Route path="/getOldAdt/:id/userId/:userId" element={<GetOldAdt /> } />

              <Route path="/addDesignation/:id" element={<AddDesignation /> } />
              <Route path="/editDesignation/:parentId/desigId/:desigId" element={<EditDesignation /> } />
              <Route path="/designationPdf/:parentId/desigId/:desigId" element={<DesignationPdf /> } /> 
              <Route path="/viewDesignationPdf/:parentId/desigId/:desigId" element={<ViewDesignationPdf /> } />
              <Route path="/getOldDesignation/:id/userId/:userId" element={<GetOldDesignation /> } />

              <Route path="/addAward/:id" element={<AddAward /> } />
              <Route path="/editAward/:parentId/awardId/:awardId" element={<EditAward /> } />
              <Route path="/awardPdf/:parentId/awardId/:awardId" element={<AwardPdf />}/>
              <Route path="/viewAwardPdf/:parentId/awardId/:awardId"element={<ViewAwardPdf />}/>
              <Route path="/getOldAwards/:id/userId/:userId" element={<GetOldAwards /> } />

              <Route path="/addDependent/:id" element={<AddDependent /> } />
              <Route path="/editDependent/:parentId/dependentId/:dependentId" element={<EditDependent /> } />
              <Route path="/dependentPdf/:parentId/dependentId/:dependentId" element={ <DependentPdf /> } />
              <Route path="/viewDependentPdf/:parentId/dependentId/:dependentId" element={<ViewDependentPdf /> } />
              <Route path="/getOldDependents/:id/userId/:userId" element={<GetOldDependents /> } />

              <Route path="/addPromotion/:id" element={<AddPromotion /> } />
              <Route path="/editPromotion/:parentId/promoId/:promoId" element={<EditPromotion /> } />
              <Route path="/promotionPdf/:parentId/promotionId/:promotionId" element={<PromotionPdf /> } />
              <Route path="/viewPromotionPdf/:parentId/promotionId/:promotionId" element={<ViewPromotionPdf /> } />
              <Route path="/getOldPromotion/:id/userId/:userId" element={<GetOldPromotion /> } />

              <Route path="/addActivity/:id" element={<AddActivity /> } />
              <Route path="/editActivity/:parentId/activityId/:activityId" element={<EditActivity /> } />
              <Route path="/activityPdf/:parentId/activityId/:activityId" element={ <ActivityPdf /> } />
              <Route path="/viewActivityPdf/:parentId/activityId/:activityId" element={<ViewActivityPdf /> } />
              <Route path="/getOldActivity/:id/userId/:userId" element={<GetOldActivity /> } />

              <Route path="/addDerogatory/:id" element={<AddDerogatory /> } />
              <Route path="/printRids/:id" element={<PrintRids /> } />
              <Route path="/viewSummaryOfInformation/:id" element={<ViewRsoi /> } />
              
              <Route path='*' element={<NotFound />} />
            </Routes>
          <Footer />
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
