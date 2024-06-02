import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ roleRequired }) => {
    const user = useSelector((state) => state.auth.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (roleRequired && user.userInfo.role !== roleRequired) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />; 
};

export default ProtectedRoute;
