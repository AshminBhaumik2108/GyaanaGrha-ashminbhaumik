import { getAllPromptsMGPT, postPromptMGPT, deletePromptMGPT } from "./mgptAI";

// Fetch and handle prompts
const fetchPromptsMGPT = async (setPrevPrompts) => {
  try {
    const data = await getAllPromptsMGPT();
    return data;
  } catch (error) {
    console.error("Error while fetching prompts:", error);
    // setPrevPrompts && setPrevPrompts([]);
  }
};

// Push new prompt
const pushPromptMGPT = async (input) => {
  try {
    const data = await postPromptMGPT(input);
    return data;
  } catch (error) {
    console.error("Error while pushing prompt:", error);
  }
};

// Delete a prompt by ID
const deleteDataMGPT = async (id) => {
  try {
    const data = await deletePromptMGPT(id);
    return data;
  } catch (error) {
    console.error("Error while deleting prompt:", error);
  }
};

export { fetchPromptsMGPT, pushPromptMGPT, deleteDataMGPT };
