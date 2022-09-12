import { useContext } from 'react';
import userContext from '../Data/userContext';
import { useNavigate } from 'react-router-dom';

export default function PrivatePage({ children }){
    const {userData, authorization, setAuthorization} = useContext(userContext)
    const navigate = useNavigate()

    function PrivateRoute(){
        return(
            <>
                {children}
            </>
        )
    }

    return(
        <>
            {authorization? <PrivateRoute/> : navigate('/sign-in')}
        </>
    )
}