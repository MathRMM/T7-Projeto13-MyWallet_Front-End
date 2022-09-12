import "./transference.css"
import {AddCircleOutline, LogOutOutline} from 'react-ionicons'
import { useContext, useEffect, useState } from "react"
import userContext from "../../Data/userContext"
import {getAccount} from '../../Data/dataService'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"

export default function AccountPage(){
    const {userData} = useContext(userContext)
    const {userId} = useParams()
    const [hasTransference, setHasTransference] = useState(false)
    const [userAccount, setUserAccount] = useState([])
    const [positive, SetPositive]= useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        getAccount(userId).then( (res) =>{
           setUserAccount(res.data)
           if(res.data.transference.length !== 0) return setHasTransference(res.data.transference)
        })
    },[])

    function NoRegistry() {
        return (
            <div className="noRegistry hidden">
                <h1>Não há registros de
                    entrada ou saída</h1>
            </div>
        )
    }

    function RenderAccountTransference(){
        if(userAccount.amount < 0) SetPositive(false)

        return(
        <>
            <ul>
                {hasTransference.map((value, i) => 
                    <li key={i}>
                        <h1>{value.time}</h1>
                        <h2>{value.description}</h2>
                        <h3 className={value.type}>{value.value}</h3>
                    </li>
                )}
            </ul>
            <div className="amount">
                <h2>Saldo</h2>
                <h3 className={positive? 'input' : 'output'}>{userAccount.amount}</h3>
            </div>
        </>
        )
        
    }

    function logout(){
        localStorage.setItem('token', null)
        navigate('/sign-in')
    }

    return(
        <div className="transfers">
            <header>
                <h1>Olá, {userData.name}</h1>
                <LogOutOutline color={"#ffffff"} 
                width='30px' height='30px'
                name="log-out-outline"
                className='logoutIcon'
                onClick={()=>logout()}></LogOutOutline>
            </header>
            <div className="container">
                {hasTransference? <RenderAccountTransference/> : <NoRegistry/>}
            </div>
            <div className="actions">
                
                <button className="entry" onClick={()=>navigate(`/private/accounts/${userId}/input`)}>
                    <AddCircleOutline color={"#ffffff"}
                    width='30px' height='30px'
                    name="add-circle-outline"></AddCircleOutline>
                    <p>Nova entrada</p>
                </button>
                
                
                <button className="exit" onClick={()=>navigate(`/private/accounts/${userId}/output`)}>
                    <AddCircleOutline color={"#ffffff"} 
                    width='30px' height='30px'
                    name="add-circle-outline"></AddCircleOutline>
                    <p>Nova saida</p>
                </button>
                
            </div>
        </div>
    )
}