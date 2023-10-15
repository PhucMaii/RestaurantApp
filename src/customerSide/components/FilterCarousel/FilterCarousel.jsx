import { Grid, Typography } from '@mui/material';
import React from 'react';

export default function FilterCarousel() {
  const data = [
    {
      src: '../../../../image/foodIcon/chinese.png',
      title: 'Indian',
    },
    {
      src: '../../../../image/foodIcon/fastfood.png',
      title: 'Fast Food',
    },
    {
      src: '../../../../image/foodIcon/pho.png',
      title: 'Pho',
    },
    {
      src: '../../../../image/foodIcon/ramen.png',
      title: 'Ramen',
    },
    {
      src: '../../../../image/foodIcon/vegetable.png',
      title: 'Vegetarian',
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
      {data.map((item, index) => {
        return (
          <Grid
            container
            key={index}
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
