import React from 'react';
import PropTypes from 'prop-types';
import { 
    Accordion,
    AccordionDetails, 
    AccordionSummary, 
    Box, 
    Divider, 
    Grid, 
    Typography 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { calculateTotalInObject, formatToTwoDecimalPlace } from '../../../utils/number';

export default function OrderSummary({ restaurantCart }) {
    const quantity = calculateTotalInObject(restaurantCart.items, 'quantity');
    
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                        {restaurantCart.restaurantInfo.restaurantName}
                    </Typography>
                    <Typography variant="subtitle2">{quantity} items</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                {
                    restaurantCart.items && restaurantCart.items.map((item, index) => {
                        return (
                            <Grid container rowGap={1} mb={2} key={index}>
                                <Grid item xs={1}>
                                    <Typography fontWeight="bold" variant="body2">x{item.quantity}</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography variant="body1" fontWeight="bold">
                                        {item.name}
                                    </Typography>
                                    {
                                        item.options && item.options.map((option, index) => {
                                            return (
                                                <Typography variant="body2" key={index}>
                                                    {option.name}
                                                </Typography>
                                            )
                                        })
                                    }
                                </Grid>
                                <Grid item xs={4} textAlign="right">
                                    <Typography variant="body1" fontWeight="bold">
                                        ${formatToTwoDecimalPlace(item.totalPrice)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                            </Grid>
                        )
                    }) 
                }
            </AccordionDetails>
        </Accordion>
  )
}

OrderSummary.propTypes = {
    restaurantCart: PropTypes.object.isRequired,
}