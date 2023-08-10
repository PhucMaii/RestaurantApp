import React, { useState } from 'react'
import {
    Button,
    InputAdornment,
    TextField,
    IconButton,
    OutlinedInput,
    InputLabel,
    FormControl,
    Typography,
    Divider,
    Link,
    Grid
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from 'styled-components'

const GridStyled = styled(Grid)`
    display: grid;
    grid-template-columns: 50% 50%;
    width: 100%;
    height: 100%;
`

const DivStyled = styled.div`
    display: flex;
    flex-direction: column;

    gap: 30px;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const TitleStyled = styled(Typography)`
    color: #854D27;
    font-weight:bold;
    margin-bottom: 50px;
    text-align: center;
`

const TextFieldInputStyled = styled(TextField)`
    width: 50%;
`

const OutlinedInputStyled = styled(FormControl)`
    width: 50%;
`

const ButtonStyled = styled(Button)`
    width: 50%;
`

const DividerStyled = styled(Divider)`
    width: 50%;
`

const LogoStyled = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 20px;
`

const TopicImageStyled = styled.img`
    width: '100%'
`
export default function SigninPage() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(show => !show);
    }

    return (
        <GridStyled container>
            <Grid item xs={6}>
                <DivStyled>
                    <TitleStyled variant='h3'>
                        Welcome Back
                    </TitleStyled>
                    <TextFieldInputStyled
                        type="input"
                        placeholder='Enter your email...'
                        label="Email"
                    />
                    <OutlinedInputStyled>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornemnt-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter your password...'
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>

                                </InputAdornment>

                            }
                            label="Password"
                        />

                    </OutlinedInputStyled>

                    <ButtonStyled variant='contained'>Sign In</ButtonStyled>
                    <DividerStyled />
                    <ButtonStyled variant='contained' color='inherit'>
                        <LogoStyled src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png" />
                        Continue With Google
                    </ButtonStyled>
                    <Typography variant='subtitle1'>Not a partner with us yet? <Link>Click here to sign up</Link></Typography>
                </DivStyled>

            </Grid>
            <Grid item xs={6}>
                <TopicImageStyled src="https://i.pinimg.com/564x/e8/03/16/e80316d006e91ff02f3b49e61a0051c0.jpg" />
            </Grid>
        </GridStyled>
    )
}
