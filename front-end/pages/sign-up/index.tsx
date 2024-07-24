import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Box, Button, Grid, TextField } from "@mui/material";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import Link from "@mui/material/Link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { authService } from "../../services/auth";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: number;
};

const SighUp = () => {
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    authService.createUser(data);
  });

  return (
    <>
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
                    label="First Name"
                    defaultValue=""
                    fullWidth
                    margin="normal"
                    helperText={errors.firstName && "Please enter your name"}
                    {...register("firstName", {
                      required: true,
                      min: 3,
                      max: 15,
                    })}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    defaultValue=""
                    fullWidth
                    margin="normal"
                    helperText="Please enter your name"
                    {...register("lastName", {
                      required: true,
                      min: 1,
                      max: 15,
                    })}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="email"
                    defaultValue=""
                    type="email"
                    fullWidth
                    margin="normal"
                    helperText="Please enter Email"
                    {...register("email", { required: true, min: 3, max: 50 })}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Mobile"
                    defaultValue=""
                    type="number"
                    fullWidth
                    margin="normal"
                    helperText="Please enter Mobile"
                    {...register("mobile", { required: true })}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    size="large"
                    fullWidth={true}
                    startIcon={<VpnKeyOutlinedIcon />}
                  >
                    Sign Up
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
                    onClick={() => router.push("/login")}
                  >
                    Login here..
                  </Link>
                </Box>
              </CardContent>
              <CardActions disableSpacing></CardActions>
            </Card>
          </Box>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </>
  );
};

export default SighUp;
