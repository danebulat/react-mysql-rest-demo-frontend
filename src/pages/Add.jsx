import React, {useState} from 'react';
import axios from 'axios';
import { enableScrollbar, bookIsValid } from '../helper';
import { serverUri } from '../config/server';

const Add = ({ setShowAddModal, setBooks, showAddModal }) => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [errorText, setErrorText] = useState([]);

  /* FADE OUT */
  function handleFadeOut() {
    setIsFadingOut(true);
    setTimeout(() => {
      setShowAddModal(false);
      setIsFadingOut(false);
    }, 300)
  }

  /* FORM INPUT CHANGE */
  const handleChange = e => {
    setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* HANDLER: CLOSE MODAL */
  const clickModalOuter = e => {
    
    // Check event target is in modal
    const modalOuterElem = document.querySelector('.modal-outer');
    const clickedOuterElem = e.target === modalOuterElem;

    if (modalOuterElem.contains(e.target) && !clickedOuterElem)
      return;

    enableScrollbar();
    handleFadeOut();
  };

  /* HANDLER: CLOSE MODAL */
  function handleClose() {
    enableScrollbar();
    handleFadeOut();
  }
  
  /* HANDLER: ADD BOOK */
  const handleClick = async e => {
    e.preventDefault();
    setErrorText([]);

    // front-end validation
    if (!bookIsValid(book)) {
      setErrorText(prev => [...prev, "Fill in required fields"]);
      return;
    }

    try {
      const res = await axios.post(`${serverUri}/books`, book);

      // show any errors and return
      if (res.data.errors) {
        res.data.errors.forEach(err =>
          setErrorText(prev => [...prev, err.msg])
        );

        return;
      }

      // add book and close modal
      const newBook = res.data[0];
      setBooks(prev => [...prev, newBook]);

      enableScrollbar();
      setShowAddModal(false);
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
            <h1>Add New Book</h1>

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
                name="title" />
            </div>
            
            <div>
              <label>Description: <span className="required">*</span></label>
              <input required
                type="text" 
                placeholder="desc" 
                onChange={handleChange} 
                name="desc" />
            </div>
            
            <div>
              <label>Price: <span className="required">*</span></label>
              <input required
                type="number" 
                placeholder="price" 
                onChange={handleChange} 
                name="price" />
            </div>
            
            <div>
              <label>Cover: </label>
              <input 
                type="text" 
                placeholder="cover" 
                onChange={handleChange} 
                name="cover" />
            </div>

            <div>
              <button className="btn formButton" onClick={handleClose}>
                Close 
              </button>
              <button className="btn btn-blue formButton" onClick={handleClick}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
