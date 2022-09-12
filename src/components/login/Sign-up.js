import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { postSignUP } from '../Data/dataService';
import './loginPage.css'


export default function SignUp(){
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email , setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [err, setErr] = useState(false)
    const [conflict ,setConflict] = useState(false)
    const [server, setServer] = useState(false)

    async function handleForm (e){
        e.preventDefault()
        if(password !== confirmPass)return setErr(true)
        try {
            await postSignUP({
                name,
                email,
                password,
            })
            navigate('/sign-in')
        } catch (error) {
            console.log(error.response.status)
            if(error.response.status === 400) {setErr(true);}
            if(error.response.status === 409) setConflict(true)
            if(error.response.status === 500) setServer(true)
        }
    }

    return(
        <div className="sign-up" >
            <h1>MyWallet</h1>
            <form onSubmit={handleForm}>
                <input id="name" name="name" 
                type="text" 
                placeholder="Nome"
                minLength="3"
                maxLength="15"
                required
                value={name}
                onChange={(e)=> setName(e.target.value)}/>
                
                <input id="email" name="email" 
                type="email" 
                placeholder="E-mail" 
                required
                value={email}
                onChange={(e)=> setEmail(e.target.value)}/>

                <input id='password' name="password" 
                type="password" 
                placeholder="Senha" 
                required
                className={err ? 'err':''}
                value={password}
                onChange={(e)=> setPassword(e.target.value)}/>

                <input id='confirmPassword' name="confirmPassword" 
                type="password" 
                placeholder="Confirme a senha" 
                required
                className={err ? 'err':''}
                value={confirmPass}
                onChange={(e)=> setConfirmPass(e.target.value)}
                />
                {conflict? <p>O email já foi cadastrado</p> : ''}
                {server? <p>O servidor esta fora de área</p> : ''}
                <button>Cadastrar</button>
            </form>
            <footer onClick={()=>navigate('/sign-in')}>Já tem uma conta? Entre agora!</footer>
        </div>
    )
}