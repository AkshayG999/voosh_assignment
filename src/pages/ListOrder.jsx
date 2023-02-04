import * as React from 'react';
import { useEffect } from 'react'
import Navbar from './Navbar'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../store/actions/authAction';
import { SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR } from '../store/types/authType'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function ListOrder() {

  const { loading, successMessage, error, authenticate, myInfo } = useSelector(state => state.auth)
  const {orders, orderMessagee, orderMessage, orderError} = useSelector(state => state.orders)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getOrder({user_id: myInfo.userId}))
  })



  useEffect(() => {
    if (!authenticate) {
      navigate("/login");
      // window.location.reload()
      // console.log('ok')
    }
    // if (successMessage) {
    //     Swal.fire({
    //         // position: 'top-end',
    //         icon: 'success',
    //         title: successMessage,
    //         showConfirmButton: false,
    //         showClass: {
    //             popup: 'animate__animated animate__fadeInDown'
    //         },
    //         hideClass: {
    //             popup: 'animate__animated animate__fadeOutUp'
    //         },
    //         timer: 2500
    //     }).then(() => {
    //         dispatch({ type: SUCCESS_MESSAGE_CLEAR })
    //     })

    // }
    // // alert.success(successMessage)

    // if (error) {
    //     // alert.error(error)
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Oops...',
    //         showClass: {
    //             popup: 'animate__animated animate__fadeInDown'
    //         },
    //         hideClass: {
    //             popup: 'animate__animated animate__fadeOutUp'
    //         },
    //         text: error
    //     })
    //     dispatch({ type: ERROR_CLEAR })

    // }
  }, [])


  return (
    <div>
      <Navbar />

      <Box sx={{ m: '7%' }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {orders.map((e, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>
                <Card sx={{ minWidth: 275, maxWidth: 300 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Order no : {e._id}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {myInfo.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {e.phone_number}
                    </Typography>
                    <Typography variant="body2">
                      Total price: ₹ {e.sub_total}
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}
