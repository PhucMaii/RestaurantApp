
import { Button, Grid } from '@mui/material'
import { grey } from '@mui/material/colors'
import styled from 'styled-components'

const ButtonStyled = styled(Button)`
    width: 90%;
`
const GridStyled = styled(Grid)`
    border: 1px solid ${props => props.$isDarkTheme ? grey[800] : grey[300] };
    border-radius: 10px;
    box-shadow: rgba(${props => props.$isDarkTheme ? '0, 0, 0, 0.2' : '100, 100, 111, 0.2'}) 0px 7px 29px 0px;
`

export {GridStyled, ButtonStyled}