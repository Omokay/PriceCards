import React, {useContext} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ActionButton from "../ActionButton/actionButton.component";
import {PricingContext} from "../../Context/pricing.context";
import {makeStyles} from "@material-ui/core/styles";
import {httpPost, baseUrl} from "../../Http_Requests/axios_post";
import CheckBox from "../CheckBox/checkBox.component";


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

const ConfirmationPage = () => {
    const {
            card, currentUser, amount,
            unitPrice,cloudStorage, isUpfront,
            disabled,
            setDisabled, checkbox, setCheckbox
    } = useContext(PricingContext);

    const classes = useStyles();

    const confirmOrder = () => {
       httpPost(baseUrl, {
           data: {
               "duration_months": card,
               "cloud_storage": cloudStorage,
               "total_price": amount,
               "current_user": currentUser,
               "discount": (isUpfront === 'Yes' ? '10%' : '0%')
           }
       }).then((res) => {
            console.log(res.data);
       })
    };
    const checkBox = async () => {
        if (!checkbox) {
            await setCheckbox(true);
            await  setDisabled(false);
        }
        else {
            await setCheckbox(false);
            await setDisabled(true);

        }

    };

    const textCheckClick = () =>  {
        console.log('pass url to terms and conditions here');
    };

    return (
        <Grid>
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
                    Summary
                </Typography>
                <Typography style={{
                    textAlign: 'left',
                    paddingBottom: '20px',
                    textTransform:  'uppercase',
                    fontSize: '28px',
                    fontWeight: '700',
                }}>
                    Order Confirmation
                </Typography>

                <Grid
                    direction="column"
                    style={{
                        margin: '0 auto',
                        width: '500px',
                        backgroundColor: 'white',
                        padding: '50px 0 50px 0',
                        borderRadius: '10px',
                        boxShadow: '0px 1px 6px -1px rgba(0,0,0,0.2)',color: 'rgb(24, 43, 58)',
                    }}
                    >
                    <Typography component="h4" variant="h3"
                        style={{
                            paddingBottom: '15px',
                        }}
                        >
                        {
                            (card === 3 ? 'Basic' : card === 6 ? 'Standard' : 'Premium')
                        } Plan
                    </Typography>
                    <div className={classes.groupings}>
                        <Typography variant="h6">
                            Duration:
                        </Typography>
                        <Typography variant="h6" >
                            {card} Months Plan
                        </Typography>
                    </div>
                    <div className={classes.groupings}>
                        <Typography component="h3">
                            Unit Price:
                        </Typography>
                        <Typography component="h3">
                            $ {unitPrice} Per GB
                        </Typography>
                    </div>
                    <div className={classes.groupings}>
                        <Typography component="h3">
                            Cloud Storage:
                        </Typography>
                        <Typography component="h3">
                            {cloudStorage} GB
                        </Typography>
                    </div>
                    <div className={classes.groupings}>
                        <Typography component="h3">
                            Discount:
                        </Typography>
                        <Typography component="h3">
                            {(isUpfront === 'Yes' ? 10 : 0)}%
                        </Typography>
                    </div>

                    <div className={classes.groupings}>
                        <Typography component="h1" variant="h5">
                            Total Sum:
                        </Typography>
                        <Typography component="h1" variant="h5"
                            className={classes.actionColor}>
                            ${amount}
                        </Typography>
                    </div>
                    <Typography>
                        {currentUser}
                    </Typography>
                    <div style={{
                        paddingTop: '20px',
                    }}>
                        <CheckBox
                            name='checkbox'
                            checked={checkbox}
                            onchange={checkBox}
                            textClick={textCheckClick}
                            required
                        />
                    </div>
                    <ActionButton
                        name='Confirm Order'
                        width='400px'
                        height='50px'
                        backgroundColor={(disabled) ? '#84142D' : '#dd1843' }
                        color='white'
                        isInactive={disabled}
                        handleClick={confirmOrder}
                        style={{
                            zIndex: '999',
                        }}

                    />
                </Grid>

            </Grid>
        </Grid>
    )
};

export default ConfirmationPage;

