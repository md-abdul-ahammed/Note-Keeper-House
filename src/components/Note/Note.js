import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import NoteDetailsModal from "../Modal/NoteDetailsModal";
import { BsPin, BsFillPinFill } from "react-icons/bs";
import "./Note.css";
import { db } from "../../Firebase/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import formatAMPM from "../../utils/formatAMPM";

const Note = ({ note }) => {
  const [modalShow, setModalShow] = useState(false);
  const { title, tagline, isPin, timestamp, id, lastUpdate } = note;

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  //set pin
  const setPin = async () => {
    const notesDoc = doc(db, "notesCollection", id);
    const newFields = {
      isPin: true,
    };
    updateDoc(notesDoc, newFields);
    toast.success("Pinned Successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  //remove pin
  const removePin = async () => {
    const notesDoc = doc(db, "notesCollection", id);
    const newFields = { isPin: false };
    updateDoc(notesDoc, newFields);
    toast.error("Removed Pinned Successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  // make AM, PM

  //make date format
  const date = note.timestamp?.toDate().toLocaleString(undefined, options);
  //get time
  const time = formatAMPM(
    note.timestamp?.toDate().toLocaleTimeString(undefined, options)
  );

  // updated make date format
  const updatedDate = note.lastUpdate
    ?.toDate()
    .toLocaleString(undefined, options);
  // updated make time format
  const updateTime = formatAMPM(
    note.lastUpdate?.toDate().toLocaleTimeString(undefined, options)
  );

  return (
    <Col>
      <Card
        style={{ height: "217px" }}
        className={"card-container bg-dark text-white"}
      >
        <Card.Body>
          <Card.Title className="fs-3 pe-3">{title}</Card.Title>
          <Card.Subtitle className="mb-2">{tagline}</Card.Subtitle>
          <div style={{ fontSize: "0.9em" }}>
            <span className="me-2 fw-bold">Created:</span>
            <span>{date}</span>
            <span className="mx-1">at</span>
            <span>{time}</span>
          </div>
          {lastUpdate && (
            <div style={{ fontSize: "0.9em" }}>
              <span className="me-2 fw-bold">Updated:</span>
              <span>{updatedDate}</span>
              <span className="mx-1">at</span>
              <span>{updateTime}</span>
            </div>
          )}
          <NoteDetailsModal
            note={note}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Card.Body>
        <Card.Footer className="text-muted">
          <button
            className="btn btn-outline-warning"
            variant="primary"
            onClick={() => setModalShow(true)}
          >
            Show Note
          </button>
        </Card.Footer>
        {!isPin ? (
          <button onClick={() => setPin()} className="unpin">
            <BsPin className="text-white" />
          </button>
        ) : (
          <button onClick={() => removePin()} className="pin">
            <BsFillPinFill />
          </button>
        )}
      </Card>
      <ToastContainer />
    </Col>
  );
};

export default Note;
