import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './Components/Landing/landing.componenet';
import PaymentCheckout from './Components/Checkout/paymentCheckout.component';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PricingContextProvider from "./Context/pricing.context";
import ConfirmationPage from './Components/Summary/order_confirmation.component';



const THEME = createMuiTheme({
    typography: {
        fontFamily: 'Poppins\', sans-serif',
    },
});

function App() {
    return (
        <PricingContextProvider>
            <Router>
                <MuiThemeProvider theme={THEME}>
                    <div className="App">

                        <Route exact path='/' component={Landing} />
                        <Route exact path='/pricing_list' component={Landing} />
                        <Route exact path='/payment_checkout' component={PaymentCheckout} />
                        <Route exact path='/order_confirmation' component={ConfirmationPage} />
                    </div>
                </MuiThemeProvider>
            </Router>
        </PricingContextProvider>

    );
}

export default App;
