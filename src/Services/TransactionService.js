import axios from 'axios';

const API_URL = 'https://localhost:7170/api/Transaction'; // Update to your real port if different

export const getTransactions = () => axios.get(API_URL);
export const getTransactionById = (id) => axios.get(`${API_URL}/${id}`);
export const addTransaction = (data) => axios.post(API_URL, data);
export const updateTransaction = (data) => axios.put(API_URL, data); // No ID in URL
export const deleteTransaction = (id) => axios.delete(`${API_URL}/${id}`);
