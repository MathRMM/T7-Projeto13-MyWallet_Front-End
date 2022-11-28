import axios from 'axios'

const URL = "https://mywallet-api-u8kn.onrender.com"

let Authorization

const postSignIn = async (user)=>{
    return await axios.post( URL+"/sign-in", user)
}

const postSignUP = async (user)=>{
    return await axios.post(URL + "/sign-up", user)
}

const getStatus = async (token)=>{
    Authorization = ('Bearer '+ token)
    const config = {
        headers:{
            Authorization,
        }
    }
    return await axios.get( URL + '/status',config)
}

const getAccount = async (userId, token)=>{
    Authorization = ('Bearer '+ token)
    if(!token) Authorization = ('Bearer '+localStorage.getItem('token'))
    const config = {
        headers:{Authorization,}
    }
    return await axios.get(URL+ `/accounts/${userId}`, config)
}

setInterval(async ()=>{
    Authorization = ('Bearer '+localStorage.getItem('token'))
    const config = {
        headers:{
            Authorization,
        }
    }
    await axios.post( URL + '/status',{},config)
    
},5000)

const postTransferenceAccount = async(userId,postData)=>{
    const config = {
        headers:{Authorization,}
    }
    return await axios.post(URL+ `/accounts/${userId}`, postData, config)
}

export {
    postSignIn,
    postSignUP, 
    getStatus,
    getAccount,
    postTransferenceAccount
}