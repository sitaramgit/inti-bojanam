import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";


const Login = () => {
    const responseMessage = (response: any) => {
        console.log(response);
    };
    const errorMessage = (error: any) => {
        console.log(error);
    };
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                headers: {
                    Authorization: `Bearer ${codeResponse.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res: any) => {
                console.log(res)
                // setProfile(res.data);
                console.log("data assigned");
            })
            .catch((err) => console.log(err));
        },
        onError: (error) => console.log('Login Failed:', error)
    });
    
    return (
        <>
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            <button onClick={()=>{login()}}>login</button>
            <GoogleLogin onSuccess={responseMessage} onError={() =>{ console.log('failed')}}/>
            {/* <GoogleOAuthProvider >
            <GoogleLogin onSuccess={responseMessage} onError={() =>{ console.log('failed')}}/>
            </GoogleOAuthProvider> */}
        </div>
        </>
    )
}

export default Login;