import { Button } from "@mui/material";
import styled from "styled-components";

const GoBackButton = styled(Button)`
    background-color: white !important;
    border: 1px solid black !important;
    color: black !important;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important;
    display: ${(props) => props.$disabled ? 'none' : ''} !important;
`
const ToCheckoutButton = styled(Button)`
    background-color: black !important;
`

export { GoBackButton, ToCheckoutButton}