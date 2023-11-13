import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function CheckoutProtectedRoute() {
    const [isSuccessful, setIsSuccessful] = useState(false);
    const eventSource = new EventSource('http://localhost:4000/sse');
    eventSource.onmessage = (event) => {
        console.log(event);
        if(event.data === 'Successful') {
            setIsSuccessful(true);
        }
    }
    console.log(isSuccessful, "BEFORE CHECKING");
    return isSuccessful ? <Outlet /> : <Navigate to="/customer/checkout" />;
}
