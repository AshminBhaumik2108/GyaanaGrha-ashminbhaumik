import axios from "axios";
import API_ from "../api";

const getAllPromptsMGPT = async () => {
  try {
    const response = await axios.get(API_.MGPTAI.GET_PROMPT());
    // Chack of for the Value...
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error Fetching All Prompts", error);
    throw error;
  }
};

const postPromptMGPT = async (input) => {
  try {
    const response = await axios.post(API_.MGPTAI.CREATE_PROMPT(), { input });
    return response.data;
  } catch (error) {
    console.error("Error posting prompt:", error);
    throw error;
  }
};

const deletePromptMGPT = async (_id) => {
  try {
    const response = await axios.delete(API_.MGPTAI.DELETE_PROMPT(_id));
    return response.data;
  } catch (error) {
    console.error("Error deleting prompt:", error);
    throw error;
  }
};

export { getAllPromptsMGPT, postPromptMGPT, deletePromptMGPT };
