import axios from 'axios';
import {hideLoader, showLoader} from "../Components/Loader/loader.component";

export const baseUrl = 'https://httpbin.org/post';

export const httpPost = async (url, postBody) => {
    try {
        showLoader();
        setInterval(() => {
            hideLoader();
        }, 4000);
        const { data } = await axios.post(`${url}`, postBody);
        return data;
    } catch (error) {
        if (error) {
            console.log(error);

        }
        return error;
    }

};
