import { Grid, Typography } from '@mui/material';
import React from 'react';

export default function FilterCarousel() {
  const data = [
    {
      src: '../../../../image/foodIcon/chinese.png',
      title: 'Night view',
      description: '4.21M views',
    },
    {
      src: '../../../../image/foodIcon/fastfood.png',
      title: 'Fast Food',
      description: '4.74M views',
    },
    {
      src: '../../../../image/foodIcon/pho.png',
      title: 'Pho',
      description: '3.98M views',
    },
    {
      src: '../../../../image/foodIcon/ramen.png',
      title: 'Ramen',
      description: '3.98M views',
    },
    {
      src: '../../../../image/foodIcon/vegetable.png',
      title: 'Vegetarian',
      description: '3.98M views',
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        gap: '50px',
        padding: '10px',
      }}
    >
      {data.map((item) => {
        return (
          <Grid
            container
            key={item.name}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <img style={{ width: '50px' }} src={item.src} />
            </Grid>
            <Grid item xs={12}>
              <Typography textAlign="center">{item.title}</Typography>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
