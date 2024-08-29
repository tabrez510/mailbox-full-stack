import axios from "axios";

const BASE_URL = 'http://localhost:3001/api/email';

const getAuthToken = () => localStorage.getItem('token');

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": 'application/json'
    }
})


//Interceptors are functions that Axios calls before a request is sent or after a response is received.
api.interceptors.request.use((config) => {
    const token = getAuthToken();
    if(token){
        config.headers.Authorization = token;
    }
    return config;
})

export const sendMail = (mail) => axios.post('/send', mail);
export const fetchSentMails = () => axios.get('/sent');
export const fetchReceivedMails = () => axios.get('/received');
export const getSentMailDetails = (emailId) => axios.get(`/sent/${emailId}`); 
export const getReceivedMailDetails = (emailId) => axios.get(`/received/${emailId}`);
export const deleteMail = (emailId) => axios.delete(`/delete/${emailId}`);