import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function CheckoutProtectedRoute() {
    const [isSuccessful, setIsSuccessful] = useState(false);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:4000/sse', {withCredentials: true});
        eventSource.onmessage = (event) => {
            const eventData = JSON.parse(event.data);
            console.log(eventData);
            if (eventData.eventType === 'checkout.session.completed') {
                setIsSuccessful(true);
            }
        }
        eventSource.onerror = (error) => {
            console.log(error);
            eventSource.close();
        }
        return () => {
            eventSource.close();
        }
    }, []);

    console.log(isSuccessful, "BEFORE CHECKING");
    return isSuccessful ? <Outlet /> : <Navigate to="/customer/checkout" />;
}
