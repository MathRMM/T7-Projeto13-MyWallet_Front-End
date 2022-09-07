import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { axios } from 'axios';

import { getStatus } from '../dataService';

export default function WithoutRoute(){
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [authorized, setAuthorized] = useState(false)
    const navigate = useNavigate()
   
    useEffect(()=>{
        if(!token) return navigate("/sing-in")
        getStatus(token)
        .then((res)=> {console.log(res); setAuthorized(true)})
        .catch(err=>{
            console.log(err.response)
            navigate("/sing-in")})
    },[])
    
    return <>Carregando...</>
}