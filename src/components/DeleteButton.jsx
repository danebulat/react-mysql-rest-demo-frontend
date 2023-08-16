import { useState } from "react";
import { ReactComponent as RightArrowRed } from '../assets/right-arrow-red.svg';
import axios from 'axios';
import { serverUri } from "../config/server";

function DeleteButton({ book, setBooks}) {
  const [show, setShow] = useState(false);

  /* ---------------------------------------- */
  /* Handlers                                 */
  /* ---------------------------------------- */

  const handleDelete = async (bookToDelete) => {
    try {
      await axios.delete(`${serverUri}/books/${bookToDelete.id}`);
      setBooks(prev => prev.filter(other => other.id !== bookToDelete.id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpen = () => {
    setShow(true);
  };

  const handleYesClick = () => {
    handleDelete(book);
  };

  const handleNoClick = () => {
    setShow(false);
  };

  return (
    <>
      <div className="delete-btn-cont">
        <button className="btn-sm btn-sm-red" 
          onClick={handleOpen}>
          Delete
          <RightArrowRed className="icon-sm" />
        </button>

        { show &&
        <div className="delete-confirm-box" onMouseLeave={() => setShow(false)}>
          <div className="delete-confirm-box__content">
            <p>
              Are you sure?
            </p>
            <div className="delete-confirm-box__options">
              <button onClick={handleYesClick} className="confirm-yes-box">Yes</button>
              <button onClick={handleNoClick} className="confirm-no-box">No</button>
            </div>
          </div>
        </div>
        }

      </div>
    </>
  );
}

export default DeleteButton;
