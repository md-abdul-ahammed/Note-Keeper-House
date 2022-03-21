import React, { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../Firebase/firebase.config";
import { Container, Row } from "react-bootstrap";
import Note from "../Note/Note";
import CreateNote from "../CreateNote/CreateNote";
import "./Notes.css";
import ReactPaginate from "react-paginate";
import Loader from "../Loader/Loader";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  //fetch all notes from firestore
  useEffect(() => {
    const q = query(notesCollectionRef, orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setNotes(
        snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .sort((a, b) => (!(a.isPin ^ b.isPin) ? 0 : a.isPin ? -1 : 1))
      );
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  // pagination functionality
  const notesPerPage = 6;
  const pagesVisited = pageNumber * notesPerPage;
  const displayNotes = notes
    .slice(pagesVisited, pagesVisited + notesPerPage)
    .map((note) => {
      return <Note key={note.id} note={note}></Note>;
    });
  const pageCount = Math.ceil(notes.length / notesPerPage);
  const notesCollectionRef = collection(db, "notesCollection");
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Container>
      <h1 className="p-4 text-center text-white border border-top-0">
        Welcome To Our Note-Keeper House
      </h1>
      <CreateNote></CreateNote>
      {isLoading ? (
        <Loader />
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4 py-5">
          {displayNotes}
        </Row>
      )}
      {notes.length > 6 && (
        <div className="py-5">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      )}
    </Container>
  );
};

export default Notes;
