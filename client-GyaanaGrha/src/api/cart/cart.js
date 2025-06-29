import axios from "axios";
import API_ from "../api"; // Adjust path if needed

const getAllCarts = async () => {
  try {
    const response = await axios.get(API_.CART.GET_ALL());
    return response.data;
  } catch (error) {
    console.error("Error fetching all pincodes:", error);
    throw error;
  }
};

const createCart = async (cart) => {
  try {
    const response = await axios.post(API_.CART.CREATE(), cart);
    return response.data;
  } catch (error) {
    console.error("Error creating pincode:", error);
    throw error;
  }
};

const deleteCart = async (_id) => {
  try {
    const response = await axios.delete(API_.CART.DELETE(_id));
    return response.data;
  } catch (error) {
    console.error("Error deleting pincode:", error);
    throw error;
  }
};

export { getAllCarts, createCart, deleteCart };
