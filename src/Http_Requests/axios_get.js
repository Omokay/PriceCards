import axios from 'axios';

export const baseUrl = 'https://cloud-storage-prices-moberries.herokuapp.com/prices';

export const httpGet = async (url) => {
    try {
        const { data } = await axios.get(`${url}`);
        return data;
    } catch (error) {
        //Alert.errorAlert();
        return error;
    }
};
