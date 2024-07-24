import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid, TextField } from "@mui/material";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "@mui/material/Link";
import { useRouter } from "next/router";
import { authService } from "../../services/auth";
import { useForm } from "react-hook-form";
import { apiService } from "../../services/apiService";
import { API_REQUESTS } from "../../common/apiRequests";
import SnackbarMsg from "../../commonUI/snakBar";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {

  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
   const [error, setError] = useState<boolean>(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit =  handleSubmit((data) => {
    login(data);
    //  authService.loginUser(data);
  });
  
  const login = async (data: any) => {
    API_REQUESTS.USER_LOGIN.PAYLOAD = data;
    try {
        const request = await apiService(API_REQUESTS.USER_LOGIN);
        console.log(request);
    } catch (error) {
        // return <SnackbarMsg/>
        setError(true)
        console.log(error);
    }
  }

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async ({ code }) => {
      authService.socialLogin(code);
    },
    flow: "auth-code",
    onError: (error) => console.log("Login Failed:", error),
  });
0


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push("/sign-up");
  };

  return (
    <>
    <SnackbarMsg open={error} message={'login failed'}/>
      <Grid container spacing={3}>
        <Grid item xs></Grid>
        <Grid item md={6}>
          <Box marginTop={"10%"}>
            <Card>
              <CardContent>
                <form onSubmit={onSubmit}>
                  <TextField
                    required
                    id="outlined-required"
                    label="email"
                    defaultValue=""
                    fullWidth
                    margin="normal"
                    type="email"
                    helperText="Please enter email"
                    {...register("email", { required: true, min: 3, max: 15 })}
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
                    {...register("password", {
                      required: true,
                      min: 3,
                      max: 10,
                    })}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    fullWidth={true}
                    startIcon={<VpnKeyOutlinedIcon />}
                  >
                    Login
                  </Button>
                </form>
                <Box
                  sx={{
                    marginTop: "10px",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    typography: "body1",
                    "& > :not(style) ~ :not(style)": {
                      ml: 2,
                    },
                  }}
                >
                  <Link
                    underline="always"
                    sx={{ cursor: "pointer" }}
                    onClick={handleClick}
                  >
                    Regester here..
                  </Link>
                </Box>
                <Typography align="center" variant="h6">
                  OR
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button
                  variant="outlined"
                  color="error"
                  size="large"
                  onClick={() => {
                    loginWithGoogle();
                  }}
                  fullWidth={true}
                  startIcon={<GoogleIcon />}
                >
                  Sign in with google
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </>
  );
};

export default Login;
