import styled from 'styled-components'
import {
    Typography
} from '@mui/material'
import { green, red } from '@mui/material/colors'

const GreenText = styled(Typography)`
    color: ${green[700]}
`
const RedText = styled(Typography)`
    color: ${red[700]}
`
export { GreenText };