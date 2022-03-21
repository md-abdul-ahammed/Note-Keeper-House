import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CreateNoteModal from "../Modal/CreateNoteModal";

const CreateNote = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <Button
        className="my-4"
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        Create Note
      </Button>
      <CreateNoteModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default CreateNote;
