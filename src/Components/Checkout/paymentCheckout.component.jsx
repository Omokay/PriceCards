import React, {useEffect, useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import CardInput from '../CardInput/cardInput.component';
import CardExpiry from '../CardExpiry/cardExpiry.component';
import ActionButton from "../ActionButton/actionButton.component";
import Alerts from "../Alerts/alerts.component";
import {PricingContext} from "../../Context/pricing.context";


const PaymentCheckout = () => {

    const {info, error, values, setValues, setError} = useContext(PricingContext);

    useEffect(() => {
        const listener = (event) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                validateInputs();
            }
        };
        console.log(values, "values");
        

    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setValues({
            ...values,
            [name]: value,
        });


    };

    const makePayment = () => {

    }

    const validateInputs = async () => {
        const cvvFormat = /^\d{3}$/;
        const panFormat = /^\d{15}$/;
        const expiryFormat = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;

        const panInput = values.pan;
        const cvvInput = values.cvv;
        const expiryInput = values.expiry;


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
            setValues({
                ...values, account: '',
                pan: '',
                cvv: '',
                expiry: '',
            });
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
                padding: '50px 0 50px 0',
                boxShadow: '0px 1px 6px -1px rgba(0,0,0,0.2)',

            }}>
                <CardInput
                    name='pan'
                    value={values && values.pan}
                    handleChange={handleInputChange}
                    label='Card Number'
                    type='tel'
                    placeholder='Enter you card number'
                    labelWidth={120}
                    image={require('../../assets/card-icon.svg').default}
                    required
                />
                    <CardExpiry
                        name='expiry'
                        value={values.expiry}
                        handleChange={handleInputChange}
                        label='MM / YY'
                        required
                    />


                    <CardInput
                        name='cvv'
                        value={values.cvv}
                        label='CVV'
                        handleChange={handleInputChange}
                        type='tel'
                        labelWidth='40'
                        placeholder='Enter your card cvv'
                        image={require('../../assets/cvv.svg').default}
                        required
                    />

            {/*<Link*/}
            {/*    style={{*/}
            {/*        textDecoration: 'none',*/}

            {/*    }}*/}
            {/*    to='/checkout_summary'>*/}
                <ActionButton
                    name = 'Pay'
                    width = '400px'
                    height = '50px'
                    backgroundColor = '#dd1843'
                    color = 'white'

                    handleClick={validateInputs}
                />
            {/*</Link>*/}
            </Grid>

            <Grid style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '210px',
                margin: '0 auto',
                paddingTop: '40px',
            }}>
                <ActionButton
                    name = 'Previous'
                    width = '100px'
                    height = '40px'
                    backgroundColor = 'rgb(248, 248, 248)'
                    color = '#dd1843'
                    style={{
                        padding: '10px',
                        visibility: 'hidden',
                    }}
                />
                <ActionButton
                    name = 'Next'
                    width = '100px'
                    height = '40px'
                    backgroundColor = 'rgb(248, 248, 248)'
                    color = '#dd1843'
                    style={{
                        padding: '10px',
                    }}
                />

            </Grid>
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
