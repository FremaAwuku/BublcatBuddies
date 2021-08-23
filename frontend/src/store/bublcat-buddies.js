import { csrfFetch } from "./csrf"

const initialState = {}

const LOAD = 'buddy/LOAD'

const ADD_BUDDY = 'buddy/ADD_BUDDY'
const REMOVE_BUDDY = 'buddy/REMOVE_BUDDY'

const load = buddies =>({
    type:LOAD,
    buddies
})

const add = buddy =>({
    type:ADD_BUDDY,
    buddy
})

const remove = buddy =>({
type:REMOVE_BUDDY,
buddy
})

export const getUsersBuddies = (userId) => async dispatch =>{
    const response = await csrfFetch(`/api/users/${userId}/bublcat-buddies`);

    if(response.ok){
        const buddies = await response.json();
        dispatch(load(buddies))
    }
}

export const addUserBuddy = (payload) => async dispatch => {
    const{
        userId,
        buddyId
    } = payload
    const data ={
        userId,
        buddyId
    }
    const response = await csrfFetch(`/api/users/${userId}/bublcat-buddies`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      if(response.ok){
        const buddy = await response.json()
        dispatch(add(buddy))
        return buddy
      }
}
export const deleteBuddy = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/bublcat-buddies/${payload.id}`, {
        method: 'DELETE',

      });
      if(response.ok){
        const buddy = await response.json()
        dispatch(remove(buddy))

}
}
const buddyReducer = (state= initialState, action) =>{
    let newState
switch(action.type){
    case LOAD:
         newState = {...state};
        action.buddies.forEach(buddy => {
            newState[buddy.id] = buddy
        })
        return newState

    case ADD_BUDDY:

        if(!state[action.buddy.id]){
             newState ={
                ...state,
                [action.buddy.id]: action.buddy
            }
            return newState
        }else
        return {
            ...state,
            [action.buddy.id]:{
                ...state[action.buddy.id],
                ...action.buddy
            }
        }

    case REMOVE_BUDDY:
         newState = {...state};
        delete newState[action.buddy.id]
        return newState

    default:
        return state;
}
}
export default buddyReducer
