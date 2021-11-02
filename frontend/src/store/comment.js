import { csrfFetch } from "./csrf"

const initialState = {}

const LOAD = 'comments/LOAD'

const ADD_COMMENT= 'comment/ADD_COMMENT'
const REMOVE_COMMENT= 'comment/REMOVE_COMMENT'



const load = comments=>({
        type:LOAD,
        comments
})

// const loadOne = comment =>({

//         type:LOAD_ONE,
//         comment

// })

const addOneComment = comment =>({
        type:ADD_COMMENT,
        comment
})

const remove = commentId =>({
    type:REMOVE_COMMENT,
    commentId
})



// export const getComments= () => async dispatch =>{
//     const response = await fetch(`/api/comments`);

//     if(response.ok){
//         const comments= await response.json();
//         dispatch(load(comments))
//     }
// }
export const getComments= (eventId) => async dispatch =>{
    const response = await fetch(`/api/events/${eventId}/comments`);

    if(response.ok){
        const comments= await response.json()
        
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
        const deletedComment= await response.json()
        const deletedCommentId = deletedComment.commentId

        dispatch(remove(deletedCommentId))

}
}

const commentReducer = (state= initialState, action) =>{
        let newState
    switch(action.type){
        case LOAD:
             newState = {...state};
            action.comments.forEach(comment => {
                newState[comment.id] = comment
                console.log(comment,"<<<<REDUCER")
            })
            return newState

        case ADD_COMMENT:

            if(!state[action.comment.id]){
                 newState ={
                    ...state,
                    [action.comment.id]: action.comment
                }
                return newState
            }else
            return {
                ...state,
                [action.comment.id]:{
                    ...state[action.comment.id],
                    ...action.comment
                }
            }

        case REMOVE_COMMENT:
             newState = {...state};
            delete newState[action.commentId]
            return newState

        default:
            return state;
    }
}

export default commentReducer
