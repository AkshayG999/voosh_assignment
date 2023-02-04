import * as React from 'react';
import { useState ,useEffect } from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
// import FilledInput from '@mui/material/FilledInput';
// import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Link, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
// import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';

import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../store/actions/authAction';
import { SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR } from '../store/types/authType'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, successMessage, error, authenticate, myInfo } = useSelector(state => state.auth)

    const [values, setValues] = React.useState({
        phone_number: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

	const handleSubmit = async (e) => {
		e.preventDefault();
        dispatch(userLogin(values))
	};


    useEffect(() => {
        if (authenticate) {
            setTimeout(() => {
                navigate("/listorder");
                window.location.reload()
            }, 5000);
            // navigate("/");
            // window.location.reload()
            // console.log('ok')
        }
        if (successMessage) {
            Swal.fire({
                // position: 'top-end',
                icon: 'success',
                title: successMessage,
                showConfirmButton: false,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                timer: 2500
            }).then(() => {
                dispatch({ type: SUCCESS_MESSAGE_CLEAR })
            })

        }
        // alert.success(successMessage)

        if (error) {
            // alert.error(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                text: error
            })
            dispatch({ type: ERROR_CLEAR })

        }
    }, [successMessage, error])


    return (
        <React.Fragment>
            <Container maxWidth="sm">
                <Box container direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{bgcolor:'#fff4' , mt:'100px',pb:'50px', boxShadow:10, borderRadius:'10px'}}>
                    <Stack
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Typography sx={{ pt: '20px', ml: '30px' }}>
                            <h1>Login your Account</h1>
                        </Typography>
                        {/* {error && (
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                This is an error alert — <strong>{error}</strong>
                            </Alert>
                        )} */}
                        <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-phone_number">phone number</InputLabel>
                            <Input
                                id="standard-adornment-phone_number"
                                type='number'
                                value={values.phone_number}
                                onChange={handleChange('phone_number')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl onClick={handleSubmit}  sx={{ width: '50%', height: '40px', mt: '50px' }}>
                            <Button variant="contained" sx={{bgcolor:'green'}}>
                            Login
                            </Button>
                        </FormControl>
                        <div>
                            <Link href='/signup'>
                                <Button variant="text" >
                                    Need an account? SignUp.
                                </Button>
                            </Link>
                        </div>
                    </Stack>
                </Box>
            </Container>
        </React.Fragment>
    )
}