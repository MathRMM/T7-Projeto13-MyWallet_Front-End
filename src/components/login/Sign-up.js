import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { postSignUP } from '../dataService';
import './loginPage.css'


export default function SignUp(){
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email , setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [err, setErr] = useState(false)
    const [unauthorized ,setUnAuthorized] = useState(false)

    async function handleForm (e){
        e.preventDefault()
        if(password !== confirmPass){
            console.log(password, confirmPass)
            return setErr(true)
        }
        const post = await postSignUP({
            name,
            email,
            password,
        })
        if(post.status === 200) console.log('tudo certo')
        if(post.status === 400) {setErr(true);}
        if(post.status === 409) setUnAuthorized(true)
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
                {unauthorized? <p>O email ja foi cadastrado</p> : ''}
                <button>Cadastrar</button>
            </form>
            <footer onClick={()=>navigate('/sing-in')}>Já tem uma conta? Entre agora!</footer>
        </div>
    )
}