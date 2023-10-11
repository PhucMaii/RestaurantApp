import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
import { formatToTwoDecimalPlace } from '../utils/number';


export default function DataTable({todayOrders}) {
    const [numberOfOrders, setNumberOfOrders] = useState(0);
    const [total, setTotal] = useState(0);
    const [revenuePercentage, setRevenuePercentage] = useState(10);
    const { t } = useTranslation();

    useEffect(() => {
        setTotal(calculateTotal(todayOrders));
        setNumberOfOrders(todayOrders.length);
    }, [todayOrders])
    
    const calculateTotal = (data) => {
        let total = 0;
        for (let order of data) {
            total += order.items.reduce((prevItem, currItem) => {
                return prevItem + currItem.totalPrice;
            }, 0)
        }
        return total;
    }

    return (
        <Grid container rowGap={3}>
            <Grid item xs={12}>
                <Divider textAlign="left"><Typography variant="h4" fontWeight="bold">{t("Reports")}</Typography></Divider>
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    label={`${t("Revenue Percentage")} (%)`}
                    onChange={(e) => setRevenuePercentage(e.target.value)}
                    type="number"
                    value={revenuePercentage}                        
                />
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6" fontWeight="bold">{t("Total")}</Typography>
                                </TableCell>
                                <TableCell align='right'>
                                    <Typography variant="h6" fontWeight="bold">$ {formatToTwoDecimalPlace(total)}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6" fontWeight="bold">{t("Revenue")}</Typography>
                                </TableCell>
                                <TableCell align='right'>
                                    <Typography variant="h6" fontWeight="bold">$ {formatToTwoDecimalPlace(total * revenuePercentage / 100)}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6" fontWeight="bold">{t("Number Of Orders")}</Typography>
                                </TableCell>
                                <TableCell align='right'>
                                    <Typography variant="h6" fontWeight="bold">{numberOfOrders} {t("Order")}</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
             
                       
        </Grid>
    )
   
}
DataTable.propTypes = {
    todayOrders: PropTypes.array.isRequired
}