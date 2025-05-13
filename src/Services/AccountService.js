// services/accountService.js
import axios from 'axios';

const API_URL = 'https://localhost:7170/api/Account';

export const getAccounts = () => axios.get(API_URL);
export const addAccount = (account) => axios.post(API_URL, account);
export const updateAccount = (account) => axios.put(API_URL, account);
export const deleteAccount = (id) => axios.delete(`${API_URL}/${id}`);
