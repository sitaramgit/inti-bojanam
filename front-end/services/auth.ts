import axios from "axios"

const createUser = (payload: any) => {
  console.log(payload)
  axios.post('http://localhost:3000/auth/register',payload).then((res: any) => console.log(res)).catch(e=>console.log(e))
}

export const authService = {
    createUser
}