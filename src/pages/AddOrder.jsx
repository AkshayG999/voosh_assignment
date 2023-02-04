import * as React from 'react';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Link, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../store/actions/authAction';
import { SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR } from '../store/types/authType'
import {ORDER_SUCCESS_MESSAGE_CLEAR} from '../store/types/orderType'
import Swal from 'sweetalert2'

export default function AddOrder() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, successMessage, error, authenticate, myInfo } = useSelector(state => state.auth)
    const {  orders, orderMessagee, orderMessage, orderError} = useSelector(state => state.orders)

console.log(authenticate)

    const [values, setValues] = React.useState({
        sub_total: '',
        phone_number: '',
        user_id: myInfo.userId
    });


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(createOrder(values))
    };


    useEffect(() => {
        if (!authenticate) {
            navigate("/login");
        }
        if (orderMessagee) {
            Swal.fire({
                // position: 'top-end',
                icon: 'success',
                title: orderMessagee,
                showConfirmButton: false,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                timer: 2500
            }).then(() => {
                dispatch({ type: ORDER_SUCCESS_MESSAGE_CLEAR })
            })

        }
        // alert.success(successMessage)

        if (orderError) {
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
                text: orderError
            })
            dispatch({ type: ERROR_CLEAR })

        }
    }, [orderMessagee, orderError])


    return (
        <React.Fragment>
            <Container maxWidth="sm">
                <Box container direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{ bgcolor: '#fff4', mt: '100px', pb: '50px', boxShadow: 10, borderRadius: '10px' }}>
                    <Stack
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Typography sx={{ pt: '20px', ml: '30px' }}>
                            <h1>Creact your order</h1>
                        </Typography>
                        {/* {error && (
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                This is an error alert — <strong>{error}</strong>
                            </Alert>
                        )} */}
                        <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-name">sub total</InputLabel>
                            <Input
                                id="standard-adornment-name"
                                type='number'
                                value={values.sub_total}
                                onChange={handleChange('sub_total')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-name">Phone Number</InputLabel>
                            <Input
                                id="standard-adornment-name"
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
                        <FormControl onClick={handleSubmit} sx={{ width: '50%', height: '40px', mt: '50px' }}>
                            <Button variant="contained"
                                sx={{ bgcolor: 'green' }}
                            >
                                + Add order
                            </Button>
                        </FormControl>
                        <div>
                            <Link href='/listorder'>
                                <Button variant="text" >
                                    go back order page
                                </Button>
                            </Link>
                        </div>
                    </Stack>
                </Box>
            </Container>
        </React.Fragment>
    )
}
