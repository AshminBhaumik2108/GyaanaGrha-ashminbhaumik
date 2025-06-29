// src/api/neighborhood/index.js
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchNeighborhoodData = async (filters) => {
  try {
    const response = await axios.post(`${BASE_URL}/getFiltereddata/getData`, filters);
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching neighborhood data:", error);
    throw error;
  }
};

export { fetchNeighborhoodData };
