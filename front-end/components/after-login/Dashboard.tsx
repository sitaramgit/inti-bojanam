import { useRouter } from "next/router";
import { memo } from "react";
import { Box, Typography, InputBase, Grid, Card, CardMedia, CardContent, Button, Container, Paper, Divider, Switch, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DirectionsIcon from '@mui/icons-material/Directions';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import { useSelector } from "react-redux";
import { stringToColor } from "../../common/commonFunctions";
import BottomNav from "./BottomNav";


const Dashboard = () => {
    const userDetails = useSelector((state: any) => state.login?.userDetails);

    const stringAvatar = (name: string) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <Container>

            <Box sx={{ flexGrow: 1 }} display={'flex'} justifyContent={'space-between'}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <FmdGoodIcon sx={{ color: '#FF0000', fontSize: '1.8rem' }} />
                    <Box>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Sri Laxmi PG
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            5th floor, A block, Gachibowli.
                        </Typography>
                    </Box>

                    <ExpandMoreIcon />
                </Box>
                <Typography >
                    {userDetails?.socialPicture ? (
                        <Avatar alt={`${userDetails?.firstName}`} src={userDetails?.socialPicture} />
                    ) : (
                        <Avatar {...stringAvatar(`${userDetails?.firstName} ${userDetails?.lastName}`)} />
                    )}
                </Typography>
            </Box>



            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={10} md={11}>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto' }}
                        >
                            <RamenDiningIcon sx={{ color: '#FF0000' }} />
                            <InputBase
                                fullWidth
                                sx={{ ml: 1, flex: 1 }}
                                placeholder={`Search "Veg" / "Non veg"`}
                                inputProps={{ 'aria-label': `Search "Veg" / "Non veg"` }}
                            />

                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon sx={{ color: '#FF0000' }} />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item xs={2} md={1}>
                        <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
                            <Typography variant="body2" gutterBottom>
                                Veg
                            </Typography>
                            <Switch defaultChecked />
                        </Box>
                    </Grid>
                </Grid>
            </Box>



            <Grid container spacing={2} style={{ padding: '10px' }}>
                <Grid item xs={6} sm={4}>
                    <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', backgroundColor: '#32CD32' }}>
                        <CardContent>
                            <Typography style={{ color: '#FFFFFF' }}>Vegetables</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', backgroundColor: '#FFA500' }}>
                        <CardContent>
                            <Typography style={{ color: '#FFFFFF' }}>Fast Food</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{ padding: '10px' }}>
                <Grid item xs={12} sm={6}>
                    <Card style={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/pizza.jpeg"
                            alt="Pizza"
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Pizza
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                $10.00
                            </Typography>
                            <Button variant="contained" style={{ marginTop: '10px', backgroundColor: '#FFD700', color: '#FFFFFF' }}>Order Now</Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <BottomNav />
        </Container>

    );
}

export default memo(Dashboard);