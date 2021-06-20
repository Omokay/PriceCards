import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { CardHeader } from "@material-ui/core";
import CardActions from '@material-ui/core/CardActions';
import RadioButtonsGroup from "../RadioButton/radioButton.component";
import RadioButtonsGroup2 from "../RadioButton2/radioButton2.component";
import ActionButton from "../ActionButton/actionButton.component";
import { PricingContext } from '../../Context/pricing.context';
import {baseUrl, httpGet} from "../../Http_Requests/axios_get";
import getTotal from "../../Utils/subscription_total";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    cardHeader: {
        font: '18px',
    }
}));

const PriceCard = () => {

    const history = useHistory();
    const { card, setCard, setAmount, prices, setPrices, isUpfront, setIsUpfront, setStorage, cloudStorage, unitPrice, setUnitPrice } = useContext(PricingContext);


    useEffect(() => {
        const total = getTotal(cloudStorage, isUpfront, unitPrice);
        console.log('Total Amount to pay ' + total);
        setAmount(total);
    }, [card, unitPrice, isUpfront, cloudStorage])

    const getPrices = () => {
        httpGet(`${baseUrl}`).then(res => {
            setPrices(res['subscription_plans']);
        })
    }

    useEffect(() => {
        getPrices();
    }, []);

    const classes = useStyles();


    const handleCardClick = async (price) => {
        const plan = price['duration_months'];
        const price_gb = price['price_usd_per_gb'];
        console.log(price_gb);
        setUnitPrice(price_gb);

        if (plan === 3) {
            await setUnitPrice(3)
            await setCard(3);

        }
        else if (plan === 6) {
            await setUnitPrice(2.5)
            await setCard(6);
        }
        else if (plan === 12) {
            await setUnitPrice(2)
            await setCard(12);
        }
        console.log(card + ' Months');
    };

    const handleBuy = () => {
        history.push('/payment_checkout');
    }



    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={5}>

                    {prices ? prices.map((price, index) => (
                        <Grid onClick={() => handleCardClick(price)} item key={index} xs={12} sm={6} md={prices.length}>
                            <Card style={{
                                cursor: 'pointer',
                                marginBottom: '10px',
                                padding: '15px',
                                border: price['duration_months'] === card ? "solid 2px red" : ""
                            }}>
                                <CardHeader
                                    title={price['duration_months'] === 3 ? "Basic" :price ['duration_months'] === 6 ? "Standard" : price['duration_months'] === 12 ? "Premium" : ""}
                                    titleTypographyProps={{ align: 'center' }}
                                    className={classes.cardHeader}
                                    subheader={<Typography>
                                     { price.duration_months}   Months
                                    </Typography>}
                                    style={{
                                        backgroundColor: '#182b3a',
                                        color: 'white',

                                    }}
                                />
                                <CardContent>
                                    <div className={classes.cardPricing}>
                                        <Typography component="h2" variant="h3" color="textPrimary">
                                            $ {price['price_usd_per_gb']}
                                        </Typography>
                                        <Typography variant="h6" color="textSecondary">
                                            /GB
                                        </Typography>
                                    </div>
                                    <ul
                                        style={{
                                            padding: 0,
                                            margin: '0 auto',
                                            color: '#182b3a',
                                            fontFamily: 'Poppins\', sans-serif',
                                        }}
                                    >
                                        <li style={{
                                            listStyle: 'none',
                                            padding: '10px 0',
                                        }}>
                                            <RadioButtonsGroup
                                                value={(card === price['duration_months']) ? cloudStorage : null }  // Manipulate Data here
                                                formLabel='Storage Amount (GB)' name='amount' radioButton={['5', '10', '50']}


                                            />
                                        </li>
                                        <li style={{
                                            listStyle: 'none',
                                        }}>
                                            <RadioButtonsGroup2
                                                value={(card === price['duration_months']) ? isUpfront : null}    // Manipulate Data here.
                                                formLabel='Upfront Payment' name='upfront_payment' radioButton={['No', 'Yes']} />
                                        </li>
                                    </ul>
                                </CardContent>
                                <CardActions style={{
                                    backgroundColor: '#f8f8f8',
                                    padding: 0,
                                    height: '100px',
                                }}>

                                    <Link
                                        to={(card === prices.duration_months ? '/payment_checkout' : '#')}
                                        style={{
                                            margin: '0 auto',
                                            textDecoration: 'none',
                                        }}>
                                        <ActionButton
                                            name='Buy'
                                            width='200px'
                                            height='50px'
                                            backgroundColor='#dd1843'
                                            color='white'
                                            handleClick={handleBuy}
                                            style={{
                                                zIndex: '999',
                                            }}
                                        />
                                    </Link>
                                </CardActions>
                            </Card>

                        </Grid>
                    )) : "Loading Prices"
                    }

                </Grid>
                <Grid style={{
                    margin: '0 auto',
                    paddingTop: '40px',
                }}>
                    <Link
                        style={{
                            textDecoration: 'none',
                        }}
                        to={((card !== '') ? '/payment_checkout' : '#')}>
                        <ActionButton
                            name='Next'
                            width='100px'
                            height='40px'
                            backgroundColor='rgb(248, 248, 248)'
                            color='#dd1843'
                            style={{
                                padding: '10px',
                            }}
                        />
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    )
}


export default PriceCard;
