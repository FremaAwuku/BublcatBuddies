import { csrfFetch } from "./csrf"

const initialState = {}

const LOAD = 'comments/LOAD'

const ADD_COMMENT= 'comment/ADD_COMMENT'
const REMOVE_COMMENT= 'comment/REMOVE_COMMENT'



const load = comments=>({
        type:LOAD,
        events
})

const loadOne = comment =>({

        type:LOAD_ONE,
        comment

})

const addOneComment = comment =>({
        type:ADD_COMMENT,
        comment
})

const remove = commentId =>({
    type:REMOVE_COMMENT,
    commentId
})



export const getComments= ({eventId}) => async dispatch =>{
    const response = await fetch(`/api/events/${eventId}/comments`);

    if(response.ok){
        const comments= await response.json();
        dispatch(load(comments))
    }
}



export const addComment= (payload) => async dispatch =>{
    const {
    content,
    eventId,
    userId
    }= payload

    const data = {
        content,
        eventId,
        userId
    }
    const response = await csrfFetch(`/api/events/${eventId}/comments`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      if(response.ok){
        const comment = await response.json()
        dispatch(addOneComment(comment))
        return comment
    }

}
export const editComment = (payload) => async dispatch => {
    const {
        content,
        commentId
        }= payload

        const data = {
            content
        }
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      if(response.ok){
        const comment = await response.json()
        dispatch(addOneComment(comment))
        return comment
}
}
export const deleteComment = (commentId) => async dispatch => {
        const commentId= Number(commentId)
        const data = {commentId}

    const response = await csrfFetch(`/api/comments/${commentId}`, {
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
