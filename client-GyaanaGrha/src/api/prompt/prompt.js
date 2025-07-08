import axios from "axios";
import API_ from "../api";

const getAllPrompts = async () => {
  try {
    const response = await axios.get(API_.PROMPT.GET_PROMPT());
    // Chack of for the Value...
    return response.data;
  } catch (error) {
    console.log("Ashmin Error");
    // console.error("Error Fetching All Prompts", error);
    throw error;
  }
};

const postPrompt = async (input) => {
  try {
    const response = await axios.post(API_.PROMPT.CREATE_PROMPT(), { input });
    return response.data;
  } catch (error) {
    console.error("Error posting prompt:", error);
    throw error;
  }
};

const deletePrompt = async (_id) => {
  try {
    const response = await axios.delete(API_.PROMPT.DELETE_PROMPT(_id));
    return response.data;
  } catch (error) {
    console.error("Error deleting prompt:", error);
    throw error;
  }
};

export { getAllPrompts, postPrompt, deletePrompt };
