import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { ContainerStyled, FabStyled } from './styles';

export default function NumberTextField({
    decrementQuantity,
    incrementQuantity,
    quantity
}) {
    
    return (
        <ContainerStyled container alignItems="center">
            <Grid item xs={4}>
                <FabStyled 
                    onClick={decrementQuantity} 
                    size="small"
                >
                    -
                </FabStyled>
            </Grid>
            <Grid item xs={4} textAlign="center">
                <Typography variant="h6" fontWeight="bold">{quantity}</Typography>
            </Grid>
            <Grid item xs={4} textAlign="right">
                <FabStyled 
                    onClick={incrementQuantity} 
                    size="small"
                >
                    +
                </FabStyled>
            </Grid>
        </ContainerStyled>
    )
}

NumberTextField.propTypes = {
    decrementQuantity: PropTypes.func.isRequired,
    incrementQuantity: PropTypes.func.isRequired,
    quantity: PropTypes.number.isRequired
}
