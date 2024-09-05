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

export const sendMail = (mail) => api.post('/send', mail);
export const fetchSentMails = () => api.get('/sent');
export const fetchReceivedMails = () => api.get('/received');
export const getSentMailDetails = (emailId) => api.get(`/sent/${emailId}`); 
export const getReceivedMailDetails = (emailId) => api.get(`/received/${emailId}`);
export const deleteMail = (emailId) => api.delete(`/delete/${emailId}`);