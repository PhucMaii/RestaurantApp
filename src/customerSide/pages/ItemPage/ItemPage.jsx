import React from 'react';
import { 
    Checkbox, 
    Divider,  
    Grid,  
    Typography, 
    useMediaQuery
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { 
    AddButton,
    AddButtonContainerStyled, 
    CancelButtonContainerStyled, 
    DividerStyled, 
    ImageStyled,
    LargeScreenAddButtonContainerStyled
} from './styles';
import NumberTextField from '../../components/NumberTextField/NumberTextField';

export default function ItemPage() {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Grid 
            container 
            p={isSmallScreen ? 0 : 5}
            pb={isSmallScreen && 12} 
            columnSpacing={!isSmallScreen && 5}
        >
            <CancelButtonContainerStyled item xs={12} textAlign="left">
                <CancelIcon fontSize="large" />
            </CancelButtonContainerStyled>
            <Grid 
                item 
                maxHeight={isSmallScreen ? 250 : 'auto'} 
                md={6} 
                mt={!isSmallScreen && 3}
                xs={12} 
            >
                <ImageStyled 
                    $isSmallScreen={isSmallScreen}
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1480&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid container m={1} rowGap={1}>
                    <Grid item xs={12}>
                        <Typography variant="h4" fontWeight="bold">Bacon Cheeseburger</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" fontWeight="bold">$2.86</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam dolor, deserunt molestias laboriosam saepe quisquam non vero! Accusantium magni aut, aspernatur, natus excepturi assumenda ducimus mollitia dolorem consectetur unde nisi.</Typography>
                    </Grid>
                </Grid> 
                <Grid container mt={2}>
                    <Grid item xs={12}>
                        <DividerStyled />
                    </Grid>
                </Grid>
                <Grid container mt={2}>
                    <Grid container ml={1}>
                        <Typography variant="h6" fontWeight="bold">Pick options</Typography>
                    </Grid>
                    <Grid container margin={1} alignItems="center">
                        <Grid item textAlign="left" xs={6}>
                            <Typography fontWeight="bolf">Grilled Pork - $3.00</Typography>
                        </Grid>
                        <Grid item textAlign="right" xs={6}>
                            <Checkbox />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                    <Grid container margin={1} alignItems="center">
                        <Grid item textAlign="left" xs={6}>
                            <Typography>Grilled Pork - $3.00</Typography>
                        </Grid>
                        <Grid item textAlign="right" xs={6}>
                            <Checkbox />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                    <Grid container margin={1} alignItems="center">
                        <Grid item textAlign="left" xs={6}>
                            <Typography>Grilled Pork - $3.00</Typography>
                        </Grid>
                        <Grid item textAlign="right" xs={6}>
                            <Checkbox />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                    <Grid container margin={1} alignItems="center">
                        <Grid item textAlign="left" xs={6}>
                            <Typography>Grilled Pork - $3.00</Typography>
                        </Grid>
                        <Grid item textAlign="right" xs={6}>
                            <Checkbox />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                    <Grid container margin={1} alignItems="center">
                        <Grid item textAlign="left" xs={6}>
                            <Typography>Grilled Pork - $3.00</Typography>
                        </Grid>
                        <Grid item textAlign="right" xs={6}>
                            <Checkbox />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                    <Grid container margin={1} alignItems="center">
                        <Grid item textAlign="left" xs={6}>
                            <Typography>Grilled Pork - $3.00</Typography>
                        </Grid>
                        <Grid item textAlign="right" xs={6}>
                            <Checkbox />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                    <Grid container margin={1} alignItems="center">
                        <Grid item textAlign="left" xs={6}>
                            <Typography>Grilled Pork - $3.00</Typography>
                        </Grid>
                        <Grid item textAlign="right" xs={6}>
                            <Checkbox />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container mt={2}>
                    <Grid item xs={12}>
                        <DividerStyled />
                    </Grid>
                </Grid>
                <Grid container mt={2} ml={1} rowGap={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" fontWeight="bold">Quantity</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <NumberTextField />
                    </Grid>
                </Grid>
                <Grid container mt={3}>
                    <LargeScreenAddButtonContainerStyled item xs={12}>
                        <AddButton fullWidth variant="contained"><Typography variant="subtitle1">Add 1 to cart - $2.86</Typography></AddButton>
                    </LargeScreenAddButtonContainerStyled>
                </Grid>
            </Grid>
            <AddButtonContainerStyled item xs={12}>
                <AddButton fullWidth variant="contained"><Typography variant="subtitle1">Add 1 to cart - $2.86</Typography></AddButton>
            </AddButtonContainerStyled>
        </Grid>
    )
}
