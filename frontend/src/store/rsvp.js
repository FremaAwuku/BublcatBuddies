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

const remove = rsvpId =>({
type:REMOVE_RSVP,
rsvpId
})

//[] TEST WITH DISPATCH
export const getEventRsvps = (eventId) => async dispatch =>{
    const response = await fetch(`/api/events/${eventId}/rsvps`);

    if(response.ok){
        const rsvps = await response.json();
        dispatch(load(rsvps))
    }
}
export const getUserRsvps = (userId) => async dispatch =>{
    const response = await csrfFetch(`/api/users/${userId}/rsvps`);

    if(response.ok){
        const rsvps = await response.json();
        dispatch(load(rsvps))
    }
}
export const addEventRsvp = (payload ) =>async dispatch =>{
    const {
        eventId,
        userId,
        confirmed
    }=payload

    const data = {
        eventId,
        userId,
        confirmed
    }
    const response = await csrfFetch(`/api/events/${eventId}/rsvps`,{
        method:'POST',
        body: JSON.stringify(data)
    });
    if(response.ok){
        const rsvp = await response.json()
        dispatch(addOneRsvp(rsvp))
        return rsvp
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
    const {
        eventId,
        userId,
        confirmed
    }=payload

    const data = {
        eventId,
        userId,
        confirmed
    }

    const response = await csrfFetch(`/api/events/${eventId}/rsvps`, {
        method: 'DELETE',
        body: JSON.stringify(data)


      });
      if(response.ok){
        const deletedRsvp = await response.json({})
        console.log(deletedRsvp)
        const rsvpId = deletedRsvp.rsvpId

        dispatch(remove(rsvpId))
}
}



const rsvpReducer = (state= initialState, action) =>{
    let newState
switch(action.type){
    case LOAD:
         newState = {...state};
        action.rsvps.forEach(rsvp => {
            newState[rsvp.id] = rsvp
        })
        return newState

    case LOAD_ONE:
         newState = {...state};
        newState[action.rsvp.id] = action.rsvp
      return newState

    case ADD_RSVP:

        if(!state[action.rsvp.id]){
             newState ={
                ...state,
                [action.rsvp.id]: action.rsvp
            }
            return newState
        }else
        return {
            ...state,
            [action.rsvp.id]:{
                ...state[action.rsvp.id],
                ...action.rsvp
            }
        }

    case REMOVE_RSVP:
         newState = {...state};
        delete newState[action.rsvpId]
        return newState

    default:
        return state;
}
}

export default rsvpReducer
