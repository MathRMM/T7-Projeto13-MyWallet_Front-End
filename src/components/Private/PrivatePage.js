import { useContext } from 'react';
import userContext from '../Data/userContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function PrivatePage({ children }){
    const {userData, authorization, setAuthorization} = useContext(userContext)
    const navigate = useNavigate()
    console.log(authorization)

    useEffect(()=>{
        if(!authorization) navigate('/sign-in')
    },[])

    function PrivateRoute(){
        return(
            <>
                {children}
            </>
        )
    }
    
    return(
        <>
            {authorization? <PrivateRoute/> : <>Carregando...</>}
        </>
    )
}