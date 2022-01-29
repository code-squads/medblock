import customAxios from '../services/customAxios';

export const sendOTP = async phone => {
    const response = await customAxios.post('/apis/sendOTP', {phone});
    console.log(response);
    if(response.status === 400 || response.status === 500)
        return false;
    return true;
}

export const verifyOTP = async (phone, code) => {
    const response = await customAxios.post('/apis/verifyOTP', {phone, code});
    console.log(response);
    if(response.status === 400 || response.status === 203)
        return false;
    return true;
}