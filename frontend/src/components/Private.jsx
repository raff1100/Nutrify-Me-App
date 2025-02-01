import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export default function Private({ children }) {
    const { loggedUser } = useContext(UserContext);

    return loggedUser !== null ? children : <Navigate to="/login" />;
}
