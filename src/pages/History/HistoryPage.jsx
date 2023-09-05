import React from 'react'
import HistoryAccordion from '../../components/HistoryAccordion/HistoryAccordion'
import ResponsiveDrawer from '../../components/Sidebar/Sidebar';

export default function HistoryPage() {
    const newDate = new Date("August 24, 2023 at 4:01:24 PM UTC-7");
    const historyPage = (
        <HistoryAccordion
          orderId="#1234"
          orderTime={newDate}
          customerName="Phuc Mai"
          customerEmail="bin@gmail.com"
          customerPhoneNumber="123456899"
          hasUtensils={false}
          items={[
            {
                name: "House Special",
                price: 16.5,
                quantity: 1,
                totalPrice: 16.5
            }, 
            {
                name: "Stir Fried Beef",
                price: 20,
                quantity: 3,
                totalPrice: 57
            }
          ]}
          itemsQuantity={2}
          subTotal={63.5}
          note=""
        />
    )
    return (
    <ResponsiveDrawer tab={historyPage} />
  )
}
