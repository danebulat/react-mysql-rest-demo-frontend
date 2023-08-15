import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { ReactComponent as Heart } from '../assets/heart.svg';
import { ReactComponent as RightArrowRed } from '../assets/right-arrow-red.svg';
import { ReactComponent as RightArrowBlue } from '../assets/right-arrow-blue.svg';
import Add from './Add';
import Update from './Update';
import { disableScrollbar, formatPrice } from '../helper';
import { serverUri } from '../config/server';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [bookForUpdate, setBookForUpdate] = useState(false);

  /* LOAD ALL BOOKS */
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(`${serverUri}/books`);
        setBooks(res.data);
      }
      catch (err) {
        console.log(err);
      }
    };

    fetchAllBooks();
  }, []);

  /* HANDLER: SHOW ADD MODAL */
  const handleShowAddModal = () => {
    disableScrollbar();
    setShowAddModal(true);
  };

  /* HANDLER: SHOW UPDATE MODAL */
  const handleShowUpdateModal = (book) => {
    disableScrollbar();
    setShowUpdateModal(true);
    setBookForUpdate(book);
  };
  
  /* HANDLER: DELETE BOOK */
  const handleDelete = async (bookToDelete) => {
    try {
      await axios.delete(`${serverUri}/books/${bookToDelete.id}`);
      setBooks(prev => prev.filter(other => other.id !== bookToDelete.id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {showAddModal && 
        <Add setShowAddModal={setShowAddModal} setBooks={setBooks}
             showAddModal={showAddModal}/>}
      
      {showUpdateModal && 
        <Update setShowUpdateModal={setShowUpdateModal} setBooks={setBooks}
                bookForUpdate={bookForUpdate}/>}

      <header>
        <h1>Book Shop</h1>
        <div className="button-cont">
          <button className="btn btn-blue" onClick={handleShowAddModal}>
            Add New Book
          </button>
        </div>
      </header>

      {books.length === 0 && 
        <h2>No books added yet...</h2>}
      
      {books.length > 0 &&
        <div className="card-grid">
          {books.map(book => 
            <div className="card-line" key={book.id}>
              <div className="card-line__header">
                <h4>{book.title}</h4>
                <p><Heart className="icon-sm"/> <span>4.8</span></p>
              </div>
              <div className="card-line__main">
                <p>{book.desc}</p>  
                <p><strong>${formatPrice(book.price)}</strong></p>
              </div>
              <div className="card-line__footer">

              <button className="btn-sm btn-sm-red" 
                onClick={() => handleDelete(book)}>
                Delete
                <RightArrowRed className="icon-sm" />
              </button>

              <button className="btn-sm btn-sm-blue" 
                onClick={() => handleShowUpdateModal(book)}>
                Update
                <RightArrowBlue className="icon-sm" />
              </button>
              </div>
            </div>
          )}
        </div> 
      }
    </div>
  );
};

export default Books;

