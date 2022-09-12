import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react';

import WithoutRoute from './login/WithoutRoute';
import SingIn from  "./login/Sign-in";
import SingUp from './login/Sign-up';
import userContext from './Data/userContext';
import PrivatePage from './Private/PrivatePage';
import AccountPage from './Private/account/accountPage';
import InputTransfer from './Private/inputAndOutput/InputTransfer';
import OutputTransfer from './Private/inputAndOutput/outputTransfer';


export default function App(){
   const [userData, setUserData] = useState({})
   const [authorization, setAuthorization] = useState(false)

    return (
        <userContext.Provider value={{
            userData, setUserData,
            authorization: authorization, setAuthorization: setAuthorization
        }}>
        <Routes>
            <Route path='/' element={<WithoutRoute/>} />
            <Route path = '/sign-in' element={<SingIn/>} />
            <Route path = '/sign-up' element={<SingUp/>} />
            <Route path = '/private/accounts/:userId' element = {
                <PrivatePage>
                    <AccountPage/>
                </PrivatePage>
            }/>
            <Route path = '/private/accounts/:userId/input' element = {
                <PrivatePage>
                    <InputTransfer/>
                </PrivatePage>
            }/>
            <Route path = '/private/accounts/:userId/output' element = {
                <PrivatePage>
                    <OutputTransfer/>
                </PrivatePage>
            }/>
        </Routes>
        </userContext.Provider>
    )
}