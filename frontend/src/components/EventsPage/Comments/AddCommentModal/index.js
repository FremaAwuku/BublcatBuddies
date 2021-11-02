import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal';

import AddComment from './AddComment';

function AddCommentModal({eventId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
      className="paw-btn-login"
      onClick={() => setShowModal(true)}>Add Comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddComment eventId={eventId} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default AddCommentModal;
