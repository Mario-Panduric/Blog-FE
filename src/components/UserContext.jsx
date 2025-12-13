import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [userName, setUserName] = useState('');

    const loginUser = (userData) => {
        setUser(userData);
        console.log(user);
    };

    const logoutUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
    
};

const useUser = () => useContext(UserContext);

export default {
    UserProvider,
    useUser,
};
