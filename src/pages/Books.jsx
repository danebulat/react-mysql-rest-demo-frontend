import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { ReactComponent as Heart } from '../assets/heart.svg';
import { ReactComponent as RightArrowBlue } from '../assets/right-arrow-blue.svg';
import Add from './Add';
import Update from './Update';
import { disableScrollbar, formatPrice } from '../helper';
import { serverUri } from '../config/server';
import DeleteButton from '../components/DeleteButton';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [bookForUpdate, setBookForUpdate] = useState(false);
  const bookLimit = 100;

  /* ---------------------------------------- */
  /* Load books                               */
  /* ---------------------------------------- */

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

  /* ---------------------------------------- */
  /* Handlers                                 */
  /* ---------------------------------------- */

  const handleShowAddModal = () => {
    disableScrollbar();
    setShowAddModal(true);
  };

  const handleShowUpdateModal = (book) => {
    disableScrollbar();
    setShowUpdateModal(true);
    setBookForUpdate(book);
  };
  
  /* ---------------------------------------- */
  /* JSX                                      */
  /* ---------------------------------------- */

  return (
    <div>
      {showAddModal && 
        <Add setShowAddModal={setShowAddModal} setBooks={setBooks} />}
      
      {showUpdateModal && 
        <Update setShowUpdateModal={setShowUpdateModal} setBooks={setBooks}
                bookForUpdate={bookForUpdate}/>}

      <header>
        <div className="title-cont">
          <h1>Book Shop</h1>
          <span>{books.length} / {bookLimit} books added</span>
        </div>
        <div className="button-cont">
          <button className="btn btn-blue" onClick={handleShowAddModal}>
            Add New Book
          </button>
        </div>
      </header>

      <section className="info-section">
        <div>
          <h2>Description</h2>
          <p>
            A sample web application built with <b>React</b>, <b>Node.js</b> and <b>MySQL</b>.
            Use the interface to create, update and delete book records from the
            backend database.
          </p>
        </div>
        <div>
          <h2>Source Code</h2>
          <p>
            <span>
              <a href="https://github.com/danebulat/react-mysql-rest-demo-frontend" 
                 target="_blank">
                  Frontend
              </a>
            </span> &#183; 
            <span>
              <a href="https://github.com/danebulat/react-mysql-rest-demo-backend" 
                 target="_blank">
                  Backend
              </a>
            </span>
          </p>
        </div>
      </section>

      {books.length === 0 && 
        <h2>No books added yet...</h2>}
      
      {books.length > 0 &&
        <div className="card-grid">
          {books.map((book, index) => 
            <div className="card-line" key={`book.id-${index}`}>
              <div className="card-line__header">
                <h4>{book.title}</h4>
                <p><Heart className="icon-sm"/> <span>4.8</span></p>
              </div>
              <div className="card-line__main">
                <p>{book.desc}</p>  
                <p><strong>${formatPrice(book.price)}</strong></p>
              </div>
              <div className="card-line__footer">

                <DeleteButton book={book} setBooks={setBooks} />

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
