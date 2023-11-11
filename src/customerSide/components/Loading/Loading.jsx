import { CircularProgress, Grid, Typography } from '@mui/material'
import React from 'react'

export default function Loading () {
    return (
        <Grid container justifyContent="center" alignItems="center" rowGap={3} mt={20}>
            <Grid item textAlign="center" xs={12}>
                <CircularProgress />
            </Grid>
            <Grid item textAlign="center" xs={12}>
                <Typography>Loading...</Typography>
            </Grid>
        </Grid>
    )
}
