import { getAllPrompts, postPrompt, deletePrompt } from "./prompt.js";

const fetchPrompts = async (setPrevPrompts) => {
  try {
    const data = await getAllPrompts();
    return data;
  } catch (error) {
    console.error("Error while fetching prompts:", error);
    setPrevPrompts([]);
  }
};

const pushPrompt = async (input) => {
  try {
    const data = await postPrompt(input);
    return data;
  } catch (error) {
    console.error("Error while pushing prompt:", error);
  }
};

const deleteData = async (id) => {
  try {
    const data = await deletePrompt(id);
    return data;
  } catch (error) {
    console.error("Error while deleting prompt:", error);
  }
};

export { fetchPrompts, pushPrompt, deleteData };
