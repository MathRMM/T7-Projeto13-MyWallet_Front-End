import { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';


import { getAccount, postSignIn } from '../Data/dataService';
import userContext from '../Data/userContext';
import './loginPage.css'



export default function SignIn(){
    const navigate = useNavigate();
    const [email , setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState(false)
    const [unauthorized ,setUnAuthorized] = useState(false)
    const {setAuthorization} = useContext(userContext)
    const {setUserData} = useContext(userContext)

   async function handleForm (e){
        e.preventDefault()
        if(password.length<8) return setErr(true)

        try {
            const response = await postSignIn({
                email,
                password,
            })
            setUserData(response.data)
            setAuthorization(true)
            localStorage.setItem('token', response.data.token)
            navigate(`/private/accounts/${response.data.userId}`)
        } catch (error) {
            console.error(error)
            if(error.response.status === 401) {setErr(true); setUnAuthorized(true);}
            if(error.response.status === 400) setErr(true)
        }   
    }

    return(
        <div className="sign-in">
            <h1>MyWallet</h1>
            <form onSubmit={handleForm}>
                <input id="email" 
                name="email" 
                type="email" 
                placeholder="E-mail" 
                className={err ? 'err':''}
                required
                value={email}
                onChange={(e)=> setEmail(e.target.value)
                }/>
                
                <input id='password' 
                name="password" type="password"
                placeholder="Senha" 
                className={err ? 'err':''}
                minLength='8'
                required
                value={password}
                onChange={(e)=> setPassword(e.target.value)
                }
                />
                {unauthorized? <p>O email ou a senha está incorreto</p> : ''}
                <button>Entrar</button>
            </form>
            <footer onClick={()=>navigate('/sign-up')}>Primeira vez? Cadastre-se!</footer>
        </div>
    )
}