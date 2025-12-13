import React, {useEffect, useState} from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const { pathname } = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const checkAuthentication = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://localhost:7149/api/Users/getLoggedUser', {
        method: 'GET',
        credentials: 'include',
      });
     setIsAuthenticated(response.status === 200);
    } catch (error) {
      console.error("Error during authentication check:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    checkAuthentication();
  }, [pathname])
  if (isLoading) {
    return <div className="">Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;