import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Divider, Grid, IconButton, Modal, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridModal } from '../styles';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase.config';
import useLocalStorage from '../../../../hooks/useLocalStorage';

export default function ShowCartModal({ open, onClose }) {
    const [isLoading, setIsLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [curUser, setCurUser] = useLocalStorage('current-customer', {});
    const customerCollection = collection(db, 'customers');
    const customerDocRef = doc(customerCollection, curUser.userId);

    useEffect(() => {
        fetchCart();
    }, [])

    const fetchCart = async () => {
        setIsLoading(true);
        try {
            const docSnapshot = await getDoc(customerDocRef);
            const data = docSnapshot.data();
            setCart(data.cart);
            setIsLoading(false);
        } catch(error) {
            setIsLoading(false);
            console.log(error);
        }
    }
  return (
    <Modal open={open} onClose={onClose}>
        {
            isLoading ? (
                <Grid container justifyContent="center" alignItems="center" rowGap={3} mt={20}>
                    <Grid item textAlign="center" xs={12}>
                        <CircularProgress />
                    </Grid>
                    <Grid item textAlign="center" xs={12}>
                        <Typography>Loading...</Typography>
                    </Grid>
                </Grid>
            ) : (
                <>
                    <GridModal 
                        style={{backgroundColor: 'white'}} 
                        container 
                        maxWidth="500px" 
                        maxHeight="500px"
                    > 
                    {
                        
                    }
                        <Grid container rowGap={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4">Restaurant Name</Typography>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography variant="h6">x1 Item Name</Typography>
                                </Grid>
                                <Grid item xs={4} textAlign="right">
                                    <Typography variant="subtitle1">$19.00</Typography>
                                </Grid>
                                <Grid item xs={2} textAlign="center">
                                    <IconButton aria-label="delete" size="large" color="error">
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                            </Grid>
                        </Grid>
                    </GridModal>    
                </>
            )
        }  
    </Modal>
  )
}

ShowCartModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}