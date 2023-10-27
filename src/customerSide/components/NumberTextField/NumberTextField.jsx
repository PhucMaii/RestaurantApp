import { Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ContainerStyled, FabStyled } from './styles'

export default function NumberTextField() {
    const [quantity, _setQuantity] = useState(1);
    return (
        <ContainerStyled container alignItems="center">
            <Grid item xs={4}>
                <FabStyled size="small">-</FabStyled>
            </Grid>
            <Grid item xs={4} textAlign="center">
                <Typography variant="h6" fontWeight="bold">{quantity}</Typography>
            </Grid>
            <Grid item xs={4} textAlign="right">
                <FabStyled size="small">+</FabStyled>
            </Grid>
        </ContainerStyled>
    )
}
