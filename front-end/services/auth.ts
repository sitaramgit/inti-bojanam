import axios from "axios"

const createUser = (payload: any) => {
  console.log(payload)
  axios.post('http://localhost:3000/auth/register',payload).then((res: any) => console.log(res)).catch(e=>console.log(e))
}
// const sorialLogin = (payload: any) => {
//     console.log(payload)
//     axios.get('http://localhost:3000/auth/socialLogin', {headers: {
//         Authorization: `Bearer ${payload.access_token}`,
//         Accept: 'application/json'
//     }}).then((res: any) => console.log(res)).catch(e=>console.log(e))
//   }

const sorialLogin = (code: any) => {
    console.log(code)
    axios.post('http://localhost:3000/auth/socialLogin', {code}).then((res: any) => console.log(res)).catch(e=>console.log(e))
  }


export const authService = {
    createUser,
    sorialLogin
}