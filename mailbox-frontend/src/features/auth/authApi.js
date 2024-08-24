import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/user';

export const loginApi = async (credentials) => {
    const res = await axios.post(`${BASE_URL}/login`, credentials);
    return res.data;
}

export const signupApi = async (userData) => {
    const res = await axios.post(`${BASE_URL}/signup`, userData);
    return res.data;
}