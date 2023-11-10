import React from 'react';
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

export default function OrderSummary() {
  return (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
        >
            <Box>
                <Typography variant="subtitle1" fontWeight="bold">Daisy Restaurant</Typography>
                <Typography variant="subtitle2">2 items</Typography>
            </Box>
        </AccordionSummary>
        <AccordionDetails>
            <Grid container rowGap={2}>
                <Grid item xs={2} textAlign="center">
                    <Typography variant="body1">2</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" fontWeight="bold">
                        Half and Half Chicken
                    </Typography>
                    <Typography variant="body2">
                        Less Spicy
                    </Typography>
                </Grid>
                <Grid item xs={4} textAlign="right">
                    <Typography variant="body1" fontWeight="bold">$20.00</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
            </Grid>
        </AccordionDetails>
    </Accordion>
  )
}
