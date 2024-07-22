import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container';
import { Box, Button, Grid, TextField } from "@mui/material";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import Link from '@mui/material/Link';
import { useRouter } from "next/router";
import { authService } from "../../services/auth";


const Login = () => {
    const router = useRouter()
    const responseMessage = (response: any) => {
        console.log(response);
    };
    const errorMessage = (error: any) => {
        console.log(error);
    };
    const login = useGoogleLogin({
        onSuccess: async ({code}) => {
            // console.log(codeResponse)
            authService.sorialLogin(code)
            // return false;
            // axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
            //     headers: {
            //         Authorization: `Bearer ${codeResponse.access_token}`,
            //         Accept: 'application/json'
            //     }
            // })
            //     .then((res: any) => {
            //         console.log(res)
            //         // setProfile(res.data);
            //         const payload = {
            //             firstName: res.data.given_name,
            //             lastName: res.data.family_name,
            //             email: res.data.email,
            //             socialName: res.data.name,
            //             socialPicture: res.data.picture,
            //             token: codeResponse.access_token,
            //             isSocialUser: true
            //         }
            //         authService.sorialLogin(payload)
            //         console.log("data assigned");
            //     })
            //     .catch((err) => console.log(err));
        },
        flow: 'auth-code',
        onError: (error) => console.log('Login Failed:', error)
    });
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleClick = (e: any) => {
        e.preventDefault()
        router.push('/sign-up')
      }
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs>

                </Grid>
                <Grid item md={6}>
                    <Box marginTop={'10%'}>
                    <Card>
                        <CardContent>
                            <form>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="User Name"
                                    defaultValue=""
                                    fullWidth
                                    margin="normal"
                                    helperText="Please enter your name"
                                />
                                <TextField
                                    required
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    fullWidth
                                    margin="normal"
                                    helperText="Please enter password"
                                />
                                <Button variant="contained" size="large" fullWidth={true} startIcon={<VpnKeyOutlinedIcon />}>
                                    Login
                                </Button>
                            </form>
                            <Box
                                sx={{
                                    marginTop: '10px',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    typography: 'body1',
                                    '& > :not(style) ~ :not(style)': {
                                        ml: 2,
                                    },
                                }}
                            >
                                <Link underline="always" sx={{cursor: 'pointer'}} onClick={handleClick}>
                                    Regester here..
                                </Link>

                            </Box>
                            <Typography align="center" variant="h6">OR</Typography>

                        </CardContent>
                        <CardActions disableSpacing>
                            <Button variant="outlined" color="error" size="large" onClick={() => { login() }} fullWidth={true} startIcon={<GoogleIcon />}>
                                Sign in with google
                            </Button>
                        </CardActions>

                    </Card>
                    </Box>
                </Grid>
                <Grid item xs>
                </Grid>
            </Grid>
        </>
    )
}

export default Login;