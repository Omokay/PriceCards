import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PriceCard from "../PriceCard/price_card.component";

const Landing = () => {
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
                Pricing
            </Typography>
            <Typography style={{
                textAlign: 'left',
                paddingBottom: '20px',
                textTransform:  'uppercase',
                fontSize: '28px',
                fontWeight: '700',
            }}>
                Check  our pricing
            </Typography>

            <PriceCard />


        </Grid>
    )
}

export default Landing;
