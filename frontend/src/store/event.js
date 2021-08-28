import { csrfFetch } from "./csrf"

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

const remove = eventId =>({
    type:REMOVE_EVENT,
    eventId
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
    const {
        name,
        description,
        image,
        hostId,
        isPrivate,
        address,
        date
    }= payload

    const data = {
        eventName:name,
        description,
        eventImageUrl:image,
        hostId,
        isPrivate,
        address,
        eventDate:date
    }
    const response = await csrfFetch(`/api/events`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      if(response.ok){
        const event = await response.json()
        dispatch(addOneEvent(event))
        return event
    }

}
export const editEvent = (payload) => async dispatch => {
    const {
        name,
        description,
        image,
        hostId,
        isPrivate,
        address,
        date,
        eventId

    }= payload

    const data = {
        eventName:name,
        description,
        eventImageUrl:image,
        hostId,
        isPrivate,
        address,
        eventDate:date
    }
    const response = await csrfFetch(`/api/events/${eventId}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      if(response.ok){
        const event = await response.json()
        dispatch(addOneEvent(event))
        return event
}
}
export const deleteEvent = (payload) => async dispatch => {
        const eventId= Number(payload)
        const data = {eventId}

    const response = await csrfFetch(`/api/events/${eventId}`, {
        method: 'DELETE',
        body: JSON.stringify(data)

      });
      if(response.ok){
        const deletedEvent = await response.json()
        const deletedEventId = deletedEvent.eventId

        dispatch(remove(deletedEventId))

}
}

const eventReducer = (state= initialState, action) =>{
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

        case ADD_EVENT:

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

        case REMOVE_EVENT:
             newState = {...state};
            delete newState[action.eventId]
            return newState

        default:
            return state;
    }
}

export default eventReducer
