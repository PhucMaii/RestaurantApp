import { Button, Grid, Typography, Divider } from "@mui/material";
import React from "react";
import BasicAccordion from "../../components/OrderDetails/OrderDetails";
export default function HomePage() {
  return (
    <Grid container>
      <Grid container rowGap={2}>
        <Grid container justifyContent="center">
          <Typography variant="h4">Preparing Time</Typography>
        </Grid>
        <Grid container justifyContent="center" columnGap={3}>
          <Button variant="contained" color="inherit">
            +
          </Button>
          <Typography variant="h6">12 mins</Typography>
          <Button variant="contained" color="inherit">
            -
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Grid container justifyContent="center" rowGap={3}>
        <Grid container justifyContent="center">
          <BasicAccordion
            key="01234"
            orderId="#01234"
            orderTime="May 14, 2023 5:09pm"
            customerName="Bin Mai"
            customerEmail="binmai@gmail.com"
            customerPhoneNumber="123456677"
            hasUtensils={false}
            items={[
              {
                name: "Make your own (3 options)",
                options: [
                  {
                    name: "Fried Egg",
                    price: 0,
                  },
                  {
                    name: "Grilled Pork",
                    price: 0,
                  },
                  {
                    name: "ADD - Spring roll",
                    price: 3,
                  },
                ],
                quantity: 1,
                price: 18,
                totalPrice: 21,
              },
              {
                name: "Minh's Specialty",
                options: [
                  {
                    name: "Rare Beef",
                    price: 0,
                  },
                  {
                    name: "Brisket",
                    price: 0,
                  },
                  {
                    name: "Meat Ball",
                    price: 0,
                  },
                ],
                quantity: 2,
                price: 15,
                totalPrice: 30,
              },
            ]}
            itemsQuantity={3}
            subTotal={51}
            note="Please add more sauce for me, last time I reaceived very less sauce. Thank you"
          />
        </Grid>
        <Grid container justifyContent="center">
          <BasicAccordion
            key="01235"
            orderId="#01235"
            orderTime="May 14, 2023 5:20pm"
            customerName="Michael Jackson"
            customerEmail="binmai@gmail.com"
            customerPhoneNumber="123456677"
            hasUtensils={true}
            items={[
              {
                name: "Make your own (3 options)",
                options: [
                  {
                    name: "Fried Egg",
                    price: 0,
                  },
                  {
                    name: "Grilled Pork",
                    price: 0,
                  },
                  {
                    name: "ADD - Spring roll",
                    price: 3,
                  },
                ],
                quantity: 1,
                price: 18,
                totalPrice: 21,
              },
              {
                name: "Minh's Specialty",
                options: [
                  {
                    name: "Rare Beef",
                    price: 0,
                  },
                  {
                    name: "Brisket",
                    price: 0,
                  },
                  {
                    name: "Meat Ball",
                    price: 0,
                  },
                ],
                quantity: 2,
                price: 15,
                totalPrice: 30,
              },
            ]}
            itemsQuantity={3}
            subTotal={60}
            note="Please add more sauce for me, last time I reaceived very less sauce. Thank you"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
