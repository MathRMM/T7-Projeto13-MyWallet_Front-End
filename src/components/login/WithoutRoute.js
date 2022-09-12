import {useNavigate} from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'

import { getStatus } from '../Data/dataService';
import userContext from '../Data/userContext';

export default function WithoutRoute(){
    const [token, setToken] = useState(localStorage.getItem('token'))
    const {authorized, setAuthorized} = useContext(userContext)
    const {userData, setUserData} = useContext(userContext)
    const navigate = useNavigate()
    
   
    useEffect(()=>{
        if(!token) return navigate("/sign-in")
        getStatus(token)
        .then((res)=> {
            console.log(res); 
            setUserData(token)
            console.log(userContext)
            setAuthorized(true)
        })
        .catch(err=>{
            console.log(err.response)
            return navigate("/sign-in")})
    },[])
    
    return <>Carregando...</>
}