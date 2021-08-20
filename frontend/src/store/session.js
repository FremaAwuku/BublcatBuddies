import { csrfFetch } from './csrf';

const LOAD ='users/LOAD'
const LOAD_ONE = 'users/LOAD_ONE'
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const load = users =>({
  type:LOAD,
  users
})
const loadOne = user =>({
  type:LOAD_ONE,
  user
})
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export  const getUsers = (users) => async (dispatch) =>{
  const response = await csrfFetch(`/api/users`);

  if(response.ok){
      const users = await response.json();
      dispatch(load(users))
  }
}
export const getOneUser = (userId) => async dispatch =>{
  const response = await csrfFetch(`/api/users/${userId}`)

  if(response.ok){
      const user = await response.json()
      dispatch(loadOne(user))
  }
}

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};


export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

export const signup = (user) => async (dispatch) => {
    const { firstName, username, email, password, profileImgUrl } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        username,
        email,
        password,
        profileImgUrl
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };


const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
      case LOAD:
             newState = {...state};
            action.users.forEach(user => {
                newState[user.id] = user
            })
            return newState
      case LOAD_ONE:
        newState = {...state};
        newState[action.user.id] = action.user
      return newState

    default:
      return state;
  }
};

export default sessionReducer;
