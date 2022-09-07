import axios from 'axios'

const URL = "http://localhost:5000"

const postSignIn = async (user)=>{
    await axios.post( URL+"/sign-in", user)
}

const postSignUP = async (user)=>{
    return await axios.post(URL + "/sign-up", user)
}

const getStatus = async (token)=>{
    const config = {
        headers:{
            token,
        }
    }
    console.log(token)
    return await axios.get( URL + '/status',config)
}

export {
    postSignIn,
    postSignUP, 
    getStatus
}