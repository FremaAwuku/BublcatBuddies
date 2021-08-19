import { csrfFetch } from "./csrf"

const initialState = {}

const LOAD = 'rsvp/LOAD'
const LOAD_ONE = 'rsvp/LOAD_ONE'
const ADD_RSVP = 'rsvp/ADD_RSVP'
const REMOVE_RSVP = 'rsvp/REMOVE_RSVP'

const load = rsvps =>({
    type:LOAD,
    rsvps
})

const loadOne = rsvp=>({

    type:LOAD_ONE,
    rsvp

})

const addOneRsvp= rsvp=>({
    type:ADD_RSVP,
    rsvp
})

const remove = rsvp =>({
type:REMOVE_RSVP,
rsvp
})

//[] TEST WITH DISPATCH
export const getRsvps = () => async dispatch =>{
    const response = await fetch(`/api/rsvps`);

    if(response.ok){
        const rsvps = await response.json();
        dispatch(load(rsvps))
    }
}
export const getOneRsvp = (rsvpId) => async dispatch =>{
    const response = await fetch(`/api/rsvps/${rsvpId}`)

    if(response.ok){
        const rsvp = await response.json()
        dispatch(loadOne(rsvp))
    }
}
export const deleteRsvp = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/rsvps/${payload.id}`, {
        method: 'DELETE',

      });
      if(response.ok){
        const rsvp = await response.json()
        dispatch(remove(rsvp))
}
}
const rsvpReducer = (state= initialState, action) =>{
    let newState
switch(action.type){
    case LOAD:
         newState = {...state};
        action.events.forEach(event => {
            newState[event.id] = event
        })
        return newState

    case LOAD_ONE:
         newState = {...state};
        newState[action.event.id] = action.event
      return newState

    case ADD_RSVP:

        if(!state[action.event.id]){
             newState ={
                ...state,
                [action.event.id]: action.event
            }
            return newState
        }else
        return {
            ...state,
            [action.event.id]:{
                ...state[action.event.id],
                ...action.event
            }
        }

    case REMOVE_RSVP:
         newState = {...state};
        delete newState[action.event.id]
        return newState

    default:
        return state;
}
}

export default rsvpReducer
