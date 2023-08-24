import * as React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
  Fab,
  Grid,
  Divider,
  ButtonGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GreenText } from "./style";
import { grey } from "@mui/material/colors";
import OrderStatusModal from '../Modals/OrderStatusModal';
import UserInfoModal from '../Modals/UserInfoModal';

function BasicAccordion({
  orderId,
  orderTime,
  userInfo, 
  hasUtensils,
  itemName,
  itemOptions,
  itemPrice,
  subTotal,
  tax,
  note
}) {
  const [prepMin, setPrepMin] = React.useState(11);
  const [prepSec, setPrepSec] = React.useState(0);
  const [status, setStatus] = React.useState("Preparing");
  const [openStatusModal, setOpenStatusModal] = React.useState(false);
  const [openCustomerInfoModal, setOpenCustomerInfoModal] = React.useState(false);

  const handleOpenStatusModal = (e) => {
    e.stopPropagation();
    setOpenStatusModal(true);
  };
  const handleCloseStatusModal = (e) => {
    e.stopPropagation();
    setOpenStatusModal(false);
  };
  const handleOpenCustomerInfoModal = (e) => {
    e.stopPropagation();
    setOpenCustomerInfoModal(true);
  };
  const handleCloseCustomerInfoModal = (e) => {
    e.stopPropagation();
    setOpenCustomerInfoModal(false);
  };
  
  const handleStatusButtonClick = (e) => {
    e.stopPropagation();
    setStatus(e.currentTarget.textContent);
    setOpenStatusModal(false);
  }

  const handleIncreasePrepTime = (e) => {
    e.stopPropagation();
    setPrepMin(prevMin => prevMin + 1);
  }

  const handleDecreasePrepTime = (e) => {
    e.stopPropagation();
    if(prepMin > 0){
      setPrepMin(prevMin => prevMin - 1);
    }
  }

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if(prepSec > 0) {
        setPrepSec(prevSec => prevSec - 1);
      } else if(prepMin > 0) {
        setPrepSec(59);
      } else {
        setStatus("Ready")
      }
    }, 1000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [prepMin, prepSec])

  React.useEffect(() => {
    if(prepMin > 0 && prepSec === 0) {
      setPrepSec(59);
      setPrepMin(prevMin => prevMin - 1);
    }
  }, [prepSec])

  return (
    <div>
      <OrderStatusModal
        open={openStatusModal}
        handleClose={handleCloseStatusModal}
        handleStatusButtonClick={handleStatusButtonClick}
      />
      <UserInfoModal
        open={openCustomerInfoModal}
        handleClose={handleCloseCustomerInfoModal}
        name="BIN MAI"
        phoneNumber="12934854"
        email="binmai@gmail.com"
      />
      <Accordion sx={{ maxWidth: "1000px", border: "2px solid black" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box sx={{ display: "flex", gap: "40px", alignItems: "center" }}>
            <Box direction="column">
              <Typography fontWeight="bold" variant="subtitle1">
                #01234
              </Typography>
              <Typography fontWeight="light" variant="subtitle2">
                May 19, 4023 3:40pm
              </Typography>
            </Box>
            <Button onClick={handleOpenCustomerInfoModal} variant="contained">B.MAI</Button>
            <GreenText variant="subtitle1">Need utensils</GreenText>
            <Button
              variant="contained"
              color={
                status === "Preparing"
                  ? "inherit"
                  : status === "Ready"
                  ? "warning"
                  : "success"
              }
              onClick={handleOpenStatusModal}
            >
              {status}
            </Button>

            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Fab
                variant="contained"
                size="small"
                color="primary"
                onClick={handleDecreasePrepTime}
              >
                -
              </Fab>
              <Typography variant="subtitle1">
                {prepMin < 10 ? `0${prepMin}` : prepMin}:
                {prepSec < 10 ? `0${prepSec}` : prepSec}
              </Typography>
              <Fab
                variant="contained"
                size="small"
                color="primary"
                onClick={handleIncreasePrepTime}
              >
                +
              </Fab>
            </Box>
            <Box direction="column">
              <Typography fontWeight="bold" variant="subtitle1">
                Pick up 4 items
              </Typography>
              <Typography fontWeight="bold" variant="subtitle1">
                Total: $88.00
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: grey[300] }}>
          <Grid container>
            <Grid item xs={6} textAlign="center">
              <Typography fontWeight="bolder" variant="h4">
                Order
              </Typography>
              {/* Item Start - testing */}
              <Grid container rowGap={3} mt={3}>
                <Grid container rowGap={2}>
                  <Grid textAlign="center" item xs={2}>
                    <Typography fontWeight="bold">x2</Typography>
                  </Grid>
                  <Grid item xs={7} textAlign="left">
                    <Typography fontWeight="bold">
                      Make your own (3 options)
                    </Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="right">
                    <Typography fontWeight="bold">$40.00</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>

                <Grid container rowGap={2}>
                  <Grid textAlign="center" item xs={2}>
                    <Typography>1</Typography>
                  </Grid>
                  <Grid item xs={7} textAlign="left">
                    <Typography>Grilled Chicken</Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="right">
                    <Typography>$0.00</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>

                <Grid container rowGap={2}>
                  <Grid textAlign="center" item xs={2}>
                    <Typography>2</Typography>
                  </Grid>
                  <Grid item xs={7} textAlign="left">
                    <Typography>Grilled Pork</Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="right">
                    <Typography>$0.00</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>

                <Grid container rowGap={2}>
                  <Grid textAlign="center" item xs={2}>
                    <Typography>3</Typography>
                  </Grid>
                  <Grid item xs={7} textAlign="left">
                    <Typography>Fried Egg</Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="right">
                    <Typography>$0.00</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>

                <Grid container rowGap={2}>
                  <Grid textAlign="center" item xs={2}></Grid>
                  <Grid item xs={7} textAlign="left">
                    <Typography fontWeight="bold">Total</Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="right">
                    <Typography fontWeight="bold">$40.00</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>
              </Grid>
              {/* End */}

              {/* Item Start */}
              <Grid container rowGap={3} mt={4}>
                <Grid container rowGap={2}>
                  <Grid textAlign="center" item xs={2}>
                    <Typography fontWeight="bold">x2</Typography>
                  </Grid>
                  <Grid item xs={7} textAlign="left">
                    <Typography fontWeight="bold">
                      Make your own (3 options)
                    </Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="right">
                    <Typography fontWeight="bold">$40.00</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>

                <Grid container rowGap={2}>
                  <Grid textAlign="center" item xs={2}>
                    <Typography>1</Typography>
                  </Grid>
                  <Grid item xs={7} textAlign="left">
                    <Typography>Spring roll</Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="right">
                    <Typography>$0.00</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>

                <Grid container rowGap={2}>
                  <Grid textAlign="center" item xs={2}>
                    <Typography>2</Typography>
                  </Grid>
                  <Grid item xs={7} textAlign="left">
                    <Typography>Grilled Pork</Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="right">
                    <Typography>$0.00</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>

                <Grid container rowGap={2}>
                  <Grid textAlign="center" item xs={2}>
                    <Typography>3</Typography>
                  </Grid>
                  <Grid item xs={7} textAlign="left">
                    <Typography>Fried Egg</Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="right">
                    <Typography>$0.00</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>

                <Grid container rowGap={2}>
                  <Grid textAlign="center" item xs={2}></Grid>
                  <Grid item xs={7} textAlign="left">
                    <Typography fontWeight="bold">Total</Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="right">
                    <Typography fontWeight="bold">$40.00</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} textAlign="center">
              <Divider orientation="vertical" />
            </Grid>
            <Grid item xs={5} textAlign="center">
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography fontWeight="bolder" variant="h4">
                    Note
                  </Typography>
                </Grid>
                <Grid item textAlign="left" sx={{ padding: "10px" }}>
                  <Typography>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ipsam doloribus dolorem consectetur error reprehenderit
                    laborum autem ducimus nisi, porro obcaecati dicta fuga?
                    Quam, nulla alias expedita ipsam molestias mollitia commodi!
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="center" rowGap={3} mt={3}>
                <Grid item>
                  <Typography fontWeight="bolder" variant="h4">
                    Total Price
                  </Typography>
                </Grid>
                <Grid container sx={{ padding: "10px" }} rowGap={3}>
                  <Grid textAlign="left" item xs={6}>
                    <Typography fontWeight="bolder" variant="subtitle1">
                      Subtotal
                    </Typography>
                  </Grid>
                  <Grid textAlign="right" item xs={6}>
                    <Typography fontWeight="bolder" variant="subtitle1">
                      $80.00
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid textAlign="left" item xs={6}>
                    <Typography fontWeight="bolder" variant="subtitle1">
                      Tax
                    </Typography>
                  </Grid>
                  <Grid textAlign="right" item xs={6}>
                    <Typography fontWeight="bolder" variant="subtitle1">
                      $8.00
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid textAlign="left" item xs={6}>
                    <Typography fontWeight="bolder" variant="subtitle1">
                      Total
                    </Typography>
                  </Grid>
                  <Grid textAlign="right" item xs={6}>
                    <Typography fontWeight="bolder" variant="subtitle1">
                      $88.00
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default React.memo(BasicAccordion)