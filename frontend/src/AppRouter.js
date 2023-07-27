import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import AboutUs from './AboutUs';
import Cards from './Cards';
import UserFeedback from './UserFeedback';
import BloodRequestPage from './BloodRequestPage';
import DonatePage from './DonatePage';
import ErrorPage from './ErrorPage';
import AdminDashboard from './AdminDashboard';
import DonorDashboard from './DonorDashboard';
import OurTeam from './OurTeam';
import DonorResponse from './DonorResponse';
import ResetPassword from './ResetPassword';
import ForbiddenAccess from './ForbiddenAccess';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<HomePage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/aboutus' element={<AboutUs />} />
                <Route path='/cards' element={<Cards />} />
                <Route path='/userfeedback' element={<UserFeedback />} />
                <Route path='/bloodrequest' element={<BloodRequestPage />} />
                <Route path='/donatemoney' element={<DonatePage />} />
                <Route path='/admindashboard' element={<AdminDashboard />} />
                <Route path='/donordashboard' element={<DonorDashboard />} />
                <Route path='/ourteam' element={<OurTeam />} />
                <Route path='/donorresponse' element={<DonorResponse />} />
                <Route path='/resetpassword' element={<ResetPassword />} />
                <Route path='/accessforbidden' element={<ForbiddenAccess />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;