import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchNeighborhoodData = async (filters) => {
  try {
    // Filters contains the Statename, Pincode, District in the form of JSON...
    const response = await axios.post(
      `${BASE_URL}/getFiltereddata/getData`,
      filters
    );
    // If there is a response data return the response Data or the Empty Value...
    // response.data?.data : It is in the form of array... and the Value is Passed Acordingly...
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching neighborhood data:", error);
    throw error;
  }
};

export { fetchNeighborhoodData };
