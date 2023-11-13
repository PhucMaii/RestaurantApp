import React, { Suspense, useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { ButtonCart } from './styles'
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase.config';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { CircularProgress } from '@mui/material';
import ShowCartModal from '../Modals/ShowCartModal/ShowCartModal';
import { calculateTotalInObject } from '../../../utils/number';

export default function CartButton() {
    const [isShowCartOpen, setIsShowCartOpen] = useState(false);
    const [numberOfItems, setNumberOfItems] = useState(0);
    const [curCustomer, _setCurCustomer] = useLocalStorage('current-customer', {});
    const customerCollection = collection(db, 'customers');
    const customerDocRef = doc(customerCollection, curCustomer.userId);
    
    useEffect(() => {
        fetchCart();
    }, [])

    const fetchCart = async () => {
        try {
            const docSnapshot = await getDoc(customerDocRef);
            const data = docSnapshot.data();
            let newNumOfItems = 0;
            console.log(data.cart);
            if(data.cart) {
                for(let restaurant of data.cart) {
                    const totalQuantity = calculateTotalInObject(restaurant.items, 'quantity');
                    newNumOfItems += totalQuantity;
                }
            }
            setNumberOfItems(newNumOfItems);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <ShowCartModal 
                disableButton={true}
                getLatestCart={fetchCart}
                open={isShowCartOpen} 
                onClose={() => setIsShowCartOpen(false)}
            />
            <ButtonCart 
                color="inherit"
                onClick={() => setIsShowCartOpen(true)}
                variant="contained" 
            >
                <Suspense fallback={<CircularProgress />}>
                    <ShoppingCartIcon /> {numberOfItems}
                </Suspense>
            </ButtonCart>
        </>
    )
}
