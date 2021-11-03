import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment } from "../../../store/comment"

function DeleteComment({ commentId }) {


    const dispatch = useDispatch()


    const handleClick = async (e) => {
        e.preventDefault();

        await dispatch(deleteComment(commentId))

    }

    return (



        <>
        <button
        // className="secondary-button"
        onClick={handleClick}
        >
         Delete Comment 🗑️
        </button>

        </>




    );
}

export default DeleteComment;
