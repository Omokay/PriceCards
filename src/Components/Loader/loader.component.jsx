import HoldOn from 'react-hold-on';

let options = {
    theme: 'sk-bounce',
    message: 'Please wait...',
    backgroundColor: '#1847B1',
    textColor: 'white',
};

export const showLoader = () => {
    HoldOn.open(options);
};

export const hideLoader = () => {
    HoldOn.close();
};
