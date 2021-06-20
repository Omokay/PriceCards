import React, { createContext, useState } from 'react';
export const PricingContext = createContext(null);

const PricingContextProvider = ({ children }) => {

    const [cvv, setCVV] = useState(null);
    const [prices, setPrices] = useState(null);
    const [card, setCard] = useState(12);
    const [amount, setAmount] = useState(null);
    const [subscription, setSubcription] = useState(null);
    const [info, setInfo] = useState(null);
    const [error, setError] = useState(null);
    const [cloudStorage, setStorage] = useState('5');
    const [isUpfront, setIsUpfront] = useState('No');
    const [unitPrice, setUnitPrice] = useState(2);
    const [expiry, setExpiry] = useState(null);
    const [cardNumber, setCardNumber] = useState(null);
    const [currentUser, setCurrentUser] = useState('chuku.omoke@gmail.com');
    const [checkbox, setCheckbox] = useState(false);
    const [disabled, setDisabled] = useState(true);



    return (
        <PricingContext.Provider
            value={{
                prices, setPrices,
                card, setCard,
                amount, setAmount,
                subscription, setSubcription,
                info, setInfo,
                error, setError,
                isUpfront, setIsUpfront,
                cloudStorage, setStorage,
                cvv, setCVV,
                unitPrice, setUnitPrice,
                expiry, setExpiry,
                cardNumber, setCardNumber,
                currentUser, setCurrentUser,
                checkbox, setCheckbox,
                disabled, setDisabled,

            }}
        >
            {children}
        </PricingContext.Provider>
    )

};

export default PricingContextProvider;
