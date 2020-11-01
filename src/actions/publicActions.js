import axios from "axios";
import {
    UPDATE,
    LOADING, 
    ERROR, 
    COMMENTS_ERROR,
    COMMENTS_LOADING,
    COMMENTS_UPDATE
 } from '../types/postsTypes'
import * as usersTypes from '../types/usersTypes';

const { GET_ALL: USERS_GET_ALL } =usersTypes;

export const getByUser = (key) => async (dispatch, getState) => {
    dispatch({
        type: LOADING,
    });
    const { users} = getState().usersReducer;
    const userId = users[key].id;
    
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
          );
          const news = response.data.map((post) => ({
            ...post,
            comments: [],
            open: false,
          }));
          const { posts } = getState().publicReducer;
          const updatePosts = [
              ...posts,
              news,
          ];
      
          dispatch({
              type: UPDATE,
              payload: updatePosts,
          });
      
          const postsKey = updatePosts.length - 1;
          const updateUsers = [...users];
          updateUsers[key] = {
              ...users[key],
              postsKey,
          };
      
          dispatch({
              type: USERS_GET_ALL,
              payload: updateUsers,
          })
    }
    catch (error) {
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Información de post no disponible',
        })
    }
};

export const openClose = (postsKey, commentKey) => async (dispatch, getState) => {
    const { posts} = getState().publicReducer;
    const selected = posts[postsKey][commentKey];

    const updated = {
        ...selected,
        open: !selected.open
    };
    // updated trae la publicacion seleccionada y cambia de close a open

    const updatePosts = [...posts];
    updatePosts[postsKey] = [
        ...posts[postsKey]
    ];

    updatePosts[postsKey][commentKey] = updated;

    dispatch({
        type: UPDATE,
        payload: updatePosts,
    });
};

export const getComments = (postsKey, commentKey) => async (dispatch, getState) => {
    dispatch({
        type: COMMENTS_LOADING,
    });

    const { posts } = getState().publicReducer;
    const selectedPost = posts[postsKey][commentKey];

    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${selectedPost.id}`);
        const updated = {
            ...selectedPost,
            comments: response.data,
        };

        const updatePosts = [...posts];
        updatePosts[postsKey] = [
            ...posts[postsKey]
        ];
        updatePosts[postsKey][commentKey] = updated;

        dispatch({
            type: COMMENTS_UPDATE,
            payload: updatePosts,
        });
    }
    catch (error) {
        console.log(error.message);
        dispatch({
            type: COMMENTS_ERROR,
            payload: 'Comentarios no disponible',
        })
    }
};
