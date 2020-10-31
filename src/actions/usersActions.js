import axios from "axios";
import { ERROR, GET_ALL, LOADING } from "../types/usersTypes";

export const getAll = () => async (dispatch) => {
    dispatch({
        type: LOADING,
    });
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({
      type: GET_ALL,
      payload: response.data,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: 'Algo salió mal, intente mas tarde',
    })
  }
};
