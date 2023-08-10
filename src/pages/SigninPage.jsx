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
import '../assets/Signin.css'

export default function SigninPage() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(show => !show);
    }

    return (
        <Grid container className='container'>
            <Grid item xs={6}>
                <div className="inputContainer">
                    <Typography variant='h3' className="title" >
                        Welcome Back
                    </Typography>
                    <TextField
                        className='input'
                        type="input"
                        placeholder='Enter your email...'
                        label="Email"
                    />
                    <FormControl className='input'>
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

                    </FormControl>

                    <Button style={{width: '50%'}} variant='contained'>Sign In</Button>
                    <Divider style={{width: '50%'}} />
                    <Button style={{width: '50%'}} variant='contained' color='inherit'>
                        <img className="googleIcon" src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png" /> 
                        Continue With Google
                    </Button>
                    <Typography variant='subtitle1'>Not a partner with us yet? <Link>Click here to sign up</Link></Typography>
                </div>

            </Grid>
            <Grid item xs={6}>
                <img style={{width: '100%'}} src="https://i.pinimg.com/564x/e8/03/16/e80316d006e91ff02f3b49e61a0051c0.jpg"/>
            </Grid>
        </Grid>
    )
}
