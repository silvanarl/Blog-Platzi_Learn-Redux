import axios from "axios";
import { ERROR, GET_BY_USER, LOADING } from "../types/postsTypes";


export const getByUser = (key) => async (dispatch, getState) => {
    const { users} = getState().usersReducer;
    const userId = users[key].id;
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    const { posts } = getState().publicReducer;
    const updatePosts = [
        ...posts,
        response.data
    ];

  dispatch({
    type: GET_BY_USER,
    payload: updatePosts,
  });
};
