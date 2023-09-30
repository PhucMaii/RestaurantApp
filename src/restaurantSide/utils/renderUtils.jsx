import { Grid, Skeleton } from '@mui/material';
import React from 'react';

export const renderSkeleton = (number, variant, height, ...responsiveValue) => {
    const gridSkeleton = [];
    for (let i = 0; i < number; i++) {
      const skeleton = (
        <Grid item xs={12} md={responsiveValue[0] || 12} xl={responsiveValue[1] || 12} key={i} >
          <Skeleton variant={variant} height={height} />
        </Grid>
      );
      gridSkeleton.push(skeleton);
    }
    return gridSkeleton;
  };