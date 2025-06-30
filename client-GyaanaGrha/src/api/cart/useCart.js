import { getAllCarts, createCart, deleteCart } from "./cart.js";

const fetchCarts = async (setPincodeData) => {
  try {
    const data = await getAllCarts();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error while fetching pincodes:", error);
    setPincodeData([]);
  }
};

const pushCarts = async (input) => {
    try {
        const data = await createCart(input);
        return data;
    } catch (error) {
        console.error("Error while pushing pincode:", error);
    }
    };

const deleteCarts = async (id) => {
  try {
    const data = await deleteCart(id);
    return data;
  } catch (error) {
    console.error("Error while deleting pincode:", error);
  }
};

export { fetchCarts, pushCarts, deleteCarts };
