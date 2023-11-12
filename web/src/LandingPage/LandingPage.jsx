import { Grid, Typography } from '@mui/material';
import React from 'react';
import { GridContainer, LeftGridContainer, NavigateButton, TopicImageGrid, TopicImageStyled } from './styles';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();

    const navigateToRestaurantLogin = () => {
        navigate('/restaurant/auth/signin');
    }

    const navigateToCustomerLogin = () => {
        navigate('/customer/auth/signin');
    }
    return (
        <GridContainer container>
            <LeftGridContainer item xs={12} sm={6}>
                <Typography color={grey[800]} variant="h1" fontWeight="bold">Life is dull without good food</Typography>
                <Grid container columnSpacing={3}>
                    <Grid item xs={6}>
                        <NavigateButton fullWidth color="success" onClick={navigateToRestaurantLogin} variant="contained">Log in as restaurant admin</NavigateButton>
                    </Grid>
                    <Grid item xs={6}>
                        <NavigateButton fullWidth onClick={navigateToCustomerLogin} variant="contained">Order food</NavigateButton>
                    </Grid>
                </Grid>
            </LeftGridContainer>
            <Grid item xs={12} sm={6}>
                <TopicImageGrid item xs={12}>
                    <TopicImageStyled src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2785&q=80" />
                </TopicImageGrid> 
            </Grid>
        </GridContainer>
    ) 
}
