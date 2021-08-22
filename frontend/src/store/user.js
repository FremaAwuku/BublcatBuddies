import { csrfFetch } from './csrf';
const LOAD ='users/LOAD'
const LOAD_ONE = 'users/LOAD_ONE'

const initialState = {}

const load = users =>({
    type:LOAD,
    users
  })
  const loadOne = user =>({
    type:LOAD_ONE,
    user
  })
  export  const getUsers = () => async (dispatch) =>{
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

  const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
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

  export default userReducer;
