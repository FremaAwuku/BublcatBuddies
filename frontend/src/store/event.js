const initialState = {}
const LOAD = 'event/LOAD'
const LOAD_ONE = 'event/LOAD_ONE'
const ADD_EVENT = 'event/ADD_EVENT'
const REMOVE_EVENT = 'event/REMOVE_EVENT'



const load = events =>({
        type:LOAD,
        events
})

const loadOne = event =>({

        type:LOAD_ONE,
        event

})

const addOneEvent = event =>({
        type:ADD_EVENT,
        event
})

const remove = event =>({
    type:REMOVE_EVENT,
    event
})



export const getEvents = () => async dispatch =>{
    const response = await fetch(`/api/events`);

    if(response.ok){
        const events = await response.json();
        dispatch(load(events))
    }
}
export const getOneEvent = (eventId) => async dispatch =>{
    const response = await fetch(`/api/events/${eventId}`)

    if(response.ok){
        const event = await response.json()
        dispatch(loadOne(event))
    }
}

export const createEvent = (payload) => async dispatch =>{
    const response = await fetch(`/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });
      if(response.ok){
        const event = await response.json()
        dispatch(addOneEvent(event))
    }

}
export const editEvent = (payload) => async dispatch => {
    const response = await fetch(`/api/events/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });
      if(response.ok){
        const event = await response.json()
        dispatch(addOneEvent(event))
}
}
// export const deleteEvent = (payload) => async dispatch => {
//     const response = await fetch(`/api/events/${payload.id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json'},
//       });
//       if(response.ok){
//         const event = await response.json()
//         dispatch(remove(event))
// }
// }

const eventReducer = (state= initialState, action) =>{

    switch(action.type){
        case LOAD:{
            const newState = {...state};
            action.events.forEach(event => {
                newState[event.id] = event
            })
            return newState
        }
        case LOAD_ONE:{
            const newState = {...state};
            newState[action.event.id] = action.event
            return newState
        }
        case ADD_EVENT:{
            if(!state[action.event.id]){
                const newState ={
                    ...state,
                    [action.event.id]: action.event
                }
                return newState
            }
            return {
                ...state,
                [action.event.id]:{
                    ...state[action.event.id],
                    ...action.pokemon
                }
            }
        }
        case REMOVE_EVENT:{
            const newState = {...state};
            delete newState[action.event.id]
            return newState
        }
        default:
            return state;
    }
}

export default eventReducer
