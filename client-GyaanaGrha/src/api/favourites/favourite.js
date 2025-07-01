import axios from "axios";
import API_ from "../api";

const getAllFavourites = async () => {
  try {
    const response = await axios.get(API_.FAVOURITE.GET_ALL());
    return response.data;
  } catch (error) {
    console.error("Error fetching all pincodes:", error);
    throw error;
  }
};

const createFavourite = async (favourite) => {
  try {
    const response = await axios.post(API_.FAVOURITE.CREATE(), favourite);
    return response.data;
  } catch (error) {
    console.error("Error creating pincode:", error);
    throw error;
  }
};

const deleteFavourite = async (_id) => {
  try {
    const response = await axios.delete(API_.FAVOURITE.DELETE(_id));
    return response.data;
  } catch (error) {
    console.error("Error deleting pincode:", error);
    throw error;
  }
};

export { getAllFavourites, createFavourite, deleteFavourite };
