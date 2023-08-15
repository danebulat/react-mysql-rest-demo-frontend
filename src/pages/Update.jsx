import React, {useState} from 'react';
import axios from 'axios';
import { enableScrollbar, bookIsValid } from '../helper';
import { serverUri } from '../config/server';

const Update = ({ setShowUpdateModal, setBooks, bookForUpdate }) => {
  const [book, setBook] = useState({ ...bookForUpdate });
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [errorText, setErrorText] = useState([]);

  /* FADE OUT */
  function handleFadeOut() {
    setIsFadingOut(true);
    setTimeout(() => {
      setShowUpdateModal(false);
      setIsFadingOut(false);
    }, 300)
  }
  
  /* HANDLER: CLOSE MODAL */
  function handleClose() {
    enableScrollbar();
    handleFadeOut();
  }

  /* FORM INPUT CHANGE */
  const handleChange = e => {
    setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* HANDLER: UPDATE BOOK */
  const handleClick = async e => {
    e.preventDefault();
    setErrorText([]);

    // front-end validation
    if (!bookIsValid(book)) {
      setErrorText(prev => [...prev, "Fill in required fields"]);
      return;
    }

    try {
      const res = await axios.put(`${serverUri}/books/${book.id}`, book);

      // show any errors and return
      if (res.data.errors) {
        res.data.errors.forEach(err =>
          setErrorText(prev => [...prev, err.msg])
        );

        return;
      }

      // update the front-end book array
      setBooks(prev =>
        prev.map(other => {
          return other.id === book.id ? book : other;
        })
      ); 

      enableScrollbar();
      handleFadeOut();
    } catch (err) {
      console.error(err); // TODO: Put error in state and show on page
    }
  };

  return (
    <>
      <div className={isFadingOut?"modal-cover fadeout60":"modal-cover fadein60"}></div>
      <div className={isFadingOut?"modal-outer slidedown":"modal-outer slideup"}>

        <div className="modal">
          <div className="form">
            <h1>Update Book</h1>

            {errorText.length > 0 && (
              <ul className="form-errors">
                {errorText.map(err => <li key={err}>{err}</li>)}
              </ul>
            )}

            <div>
              <label>Title: <span className="required">*</span></label>
              <input required
                type="text" 
                placeholder="title" 
                onChange={handleChange} 
                name="title"
                value={book.title} />
            </div>
            
            <div>
              <label>Description: <span className="required">*</span></label>
              <input required
                type="text" 
                placeholder="desc" 
                onChange={handleChange} 
                name="desc"
                value={book.desc} />
            </div>
            
            <div>
              <label>Price: <span className="required">*</span></label>
              <input required
                type="number" 
                placeholder="price" 
                onChange={handleChange} 
                name="price"
                value={book.price} />
            </div>
            
            <div>
              <label>Cover: </label>
              <input 
                type="text" 
                placeholder="cover" 
                onChange={handleChange} 
                name="cover"
                value={book.cover} />
            </div>
            <div>
              <button className="btn formButton" onClick={handleClose}>
                Close 
              </button>
              <button className="btn btn-blue formButton" onClick={handleClick}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;
