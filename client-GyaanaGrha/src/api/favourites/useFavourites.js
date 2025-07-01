import { getAllFavourites, createFavourite, deleteFavourite } from "./favourite.js";

const fetchFavourites = async (setPincodeData) => {
  try {
    const data = await getAllFavourites();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error while fetching pincodes:", error);
    setPincodeData([]);
  }
};

const pushFavourite = async (input) => {
    try {
        const data = await createFavourite(input);
        return data;
    } catch (error) {
        console.error("Error while pushing pincode:", error);
    }
    };

const deleteFavourites = async (id) => {
  try {
    const data = await deleteFavourite(id);
    return data;
  } catch (error) {
    console.error("Error while deleting pincode:", error);
  }
};

export { fetchFavourites, pushFavourite, deleteFavourites };
