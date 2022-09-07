import { Routes, Route, useNavigate } from 'react-router-dom'


import WithoutRoute from './login/WithoutRoute';
import SingIn from  "./login/Sign-in";
import SingUp from './login/Sign-up';


export default function App(){
   
    return (
        <Routes>
           <Route path='/' element={<WithoutRoute/>} />
            <Route path = '/sing-in' element={<SingIn/>} />
            <Route path = '/sing-up' element={<SingUp/>} />
        </Routes>
    )
}