import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { CarouselContainer, Icon } from './styles';

export default function FilterCarousel({ filterByType }) {
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
      title: 'Chinese',
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
    <CarouselContainer>
      {data.map((item, index) => {
        return (
          <Grid
            container
            key={index}
            justifyContent="center"
            alignItems="center"
            onClick={() => filterByType(item.title)}
          >
            <Grid item xs={12}>
              <Icon src={item.src} />
            </Grid>
            <Grid item xs={12}>
              <Typography textAlign="center">{item.title}</Typography>
            </Grid>
          </Grid>
        );
      })}
    </CarouselContainer>
  );
}

FilterCarousel.propTypes = {
  filterByType: PropTypes.func.isRequired
}