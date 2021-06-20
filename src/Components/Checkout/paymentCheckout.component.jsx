import React, {useEffect, useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import CardInput from '../CardInput/cardInput.component';
import CustomInput from '../CustomInput/customInput.component';
import ActionButton from "../ActionButton/actionButton.component";
import Alerts from "../Alerts/alerts.component";
import {PricingContext} from "../../Context/pricing.context";
import {Link} from "@material-ui/core";
import {formatExpirationDate, formatCardNumber, clearNumber} from "../../Utils/cardFormatting";
import { useHistory } from "react-router-dom"
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    groupings: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '280px',
        margin: '0 auto',
        paddingBottom: '15px',
    },
    actionColor: {
        color: 'rgb(221, 24, 67)',
    }
}));

const PaymentCheckout = () => {


    const history = useHistory();
    const {info, error, expiry, cvv, setCVV, card, amount, cardNumber, setCardNumber, setError, setExpiry} = useContext(PricingContext);

    const classes = useStyles();

    const handleCVV = async (event) => {
        const data = event.target.value;
        if (data.length > 3) {
            return;
        }
        await setCVV(event.target.value);
    }

    const handleExpiry = async (event) => {
        event.target.value = formatExpirationDate(event.target.value);
        console.log(event.target.value);
        await setExpiry(event.target.value);
    }

    const handleCardNumber = async (event) => {
        event.target.value = formatCardNumber(event.target.value);
        await setCardNumber(event.target.value);
    }

    const makePayment = async () => {
        await setCardNumber(null);
        await setExpiry(null);
        await setCVV(null);

        history.push('/order_confirmation');
    }

    const validateInputs = async () => {


        const cvvFormat = /^\d{3}$/;
        const panFormat = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
        const expiryFormat = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;


        let panInput = clearNumber(cardNumber);
        const cvvInput = cvv;
        const expiryInput = expiry;

        if (panInput === '' && cvvInput === '' && expiryInput === '') {
            setError('All fields are required!');
        }
        else if (!panFormat.test(panInput)) {
            setError('Card number is not valid');
        }
        else if (!expiryFormat.test(expiryInput)) {
            setError('Enter a valid expiry date');
        }
        else if (!cvvFormat.test(cvvInput)) {
            setError('Enter a valid CVV number');
        }
        else {
            await setError('');
            await makePayment();
        }

    };

    // HANDLE MUI SNACKBAR
    const handleAlert = async (event, reason) => {

        if (reason === 'clickaway') {
            await setError('');
        }
        await setError('');
    };

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{
                padding: '100px 0',
            }}>
            <Typography style={{
                textAlign: 'left',
                padding: '10px 0',
            }}>
                Checkout
            </Typography>
            <Typography style={{
                textAlign: 'left',
                paddingBottom: '20px',
                textTransform:  'uppercase',
                fontSize: '28px',
                fontWeight: '700',
            }}>
                Make payment here
            </Typography>

            <Grid
                direction="column"
                style={{
                margin: '0 auto',
                backgroundColor: 'white',
                padding: '50px 10px',
                borderRadius: '10px',
                boxShadow: '0px 1px 6px -1px rgba(0,0,0,0.2)',

            }}>
                <Typography component='h3' variant='h4'>
                    {(card === 3 ? 'Basic' : card === 6 ? 'Standard' : 'Premium')} Plan
                </Typography>
                <Typography variant="h5" className={classes.actionColor}>
                    ${amount && amount}
                </Typography>
                <CardInput
                    name='pan'
                    value={cardNumber}
                    handleChange={handleCardNumber}
                    label='Card Number'
                    type='tel'
                    placeholder='Enter you card number'
                    labelWidth={120}
                    image={require('../../assets/card-icon.svg').default}
                    required
                    style={{
                        paddingBottom: '0',
                        marginBottom: '0',
                    }
                    }
                />

                    <CustomInput
                        name='expiry'
                        placeholder='Expiry Date'
                        value={expiry}
                        handleChange={handleExpiry}
                        label='MM / YY'
                        required
                    />

                    <CustomInput
                        name='cvv'
                        value={cvv}
                        label='CVV'
                        handleChange={handleCVV}
                        type='password'
                        labelWidth='40'
                        placeholder='Cvv'
                        // image={require('../../assets/cvv.svg').default}
                        required
                    />

            <Link
                style={{
                    textDecoration: 'none',
                }}
                to='/checkout_summary'>
                <ActionButton
                    name = 'Pay'
                    width = '400px'
                    height = '50px'
                    backgroundColor = '#dd1843'
                    color = 'white'

                    handleClick={validateInputs}
                />
            </Link>
            </Grid>

            {/*<Grid style={{*/}
            {/*    display: 'flex',*/}
            {/*    justifyContent: 'space-between',*/}
            {/*    width: '210px',*/}
            {/*    margin: '0 auto',*/}
            {/*    paddingTop: '40px',*/}
            {/*}}>*/}
            {/*    <ActionButton*/}
            {/*        name = 'Previous'*/}
            {/*        width = '100px'*/}
            {/*        height = '40px'*/}
            {/*        backgroundColor = 'rgb(248, 248, 248)'*/}
            {/*        color = '#dd1843'*/}
            {/*        style={{*/}
            {/*            padding: '10px',*/}
            {/*            visibility: 'hidden',*/}
            {/*        }}*/}
            {/*    />*/}
            {/*    <ActionButton*/}
            {/*        name = 'Next'*/}
            {/*        width = '100px'*/}
            {/*        height = '40px'*/}
            {/*        backgroundColor = 'rgb(248, 248, 248)'*/}
            {/*        color = '#dd1843'*/}
            {/*        style={{*/}
            {/*            padding: '10px',*/}
            {/*        }}*/}
            {/*    />*/}

            {/*</Grid>*/}
            {
                (error && error.length > 0) ?
                    <Alerts
                        open={true}
                        severity='error'
                        duration='2000'
                        errorMessage={error}
                        handleClose={handleAlert} /> :
                    (info && info.length > 0) ?

                    <Alerts
                        open={true}
                        severity='success'
                        duration='2000'
                        errorMessage={info}
                        handleClose={handleAlert}

                /> : null
            }
        </Grid>

    )
}


export default PaymentCheckout;
