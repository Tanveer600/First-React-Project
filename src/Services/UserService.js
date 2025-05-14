import axios from 'axios';

const API_URL = 'https://localhost:7170/api/User'; // adjust as needed

export const loginUser = async (userName, password) => {
  try {
    const response = await axios.post(`${API_URL}/authenticate`, {
      userName,
      password
    });

    return response.data; // ResponseDataModel
  } catch (error) {
    // Handle API-level or network error
    if (error.response) {
      return error.response.data; // still structured as ResponseDataModel from your API
    } else {
      return {
        isSuccess: false,
        message: 'Network error or server not reachable.',
        errorResponse: error
      };
    }
  }
};
