import { useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const API_ = {
  PROMPT: {
    GET_PROMPT: () => `${BASE_URL}/promptState/all`,
    CREATE_PROMPT: () => `${BASE_URL}/promptState/create`,
    DELETE_PROMPT: (_id) => `${BASE_URL}/promptState/delete/${_id}`,
  },
  CART: {
    GET_ALL: () => `${BASE_URL}/cart/all`,
    CREATE: () => `${BASE_URL}/cart/create`,
    DELETE: (_id) => `${BASE_URL}/cart/delete/${_id}`,
  },
  FAVOURITE : {
    GET_ALL: () => `${BASE_URL}/favourite/all`,
    CREATE: () => `${BASE_URL}/favourite/create`,
    DELETE: (_id) => `${BASE_URL}/favourite/delete/${_id}`,
  },
};

export default API_;
