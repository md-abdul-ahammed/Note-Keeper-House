import "react-toastify/dist/ReactToastify.css";
import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { db } from "../../Firebase/firebase.config";

function NoteDetailsModal(props) {
  const { title, tagline, body, id } = props.note;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Note Update
  const updateNote = async (updateTitle, updatedTagline, updatedBody) => {
    const notesDoc = doc(db, "notesCollection", id);
    const newFields = {
      title: updateTitle,
      tagline: updatedTagline,
      body: updatedBody,
      lastUpdate: serverTimestamp(),
    };

    props.onHide();

    updateDoc(notesDoc, newFields);
    toast.success("Updated Successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  // Delete Note
  const deleteNote = async () => {
    const notesdoc = doc(db, "notesCollection", id);
    deleteDoc(notesdoc);

    toast.error("Removed Successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const onSubmit = (data) => {
    const { updateTitle, updatedTagline, updatedBody } = data;
    // update note
    updateNote(updateTitle, updatedTagline, updatedBody);
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup className="pt-5 pb-3 px-5">
            <InputGroup.Text id="inputGroup-sizing-default">
              <p className="fw-bold m-0">Title</p>
            </InputGroup.Text>
            <FormControl
              {...register("updateTitle", { required: true })}
              defaultValue={title}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          {errors.updateTitle && (
            <p className="error-message">This field is required</p>
          )}
          <InputGroup className="pb-3 px-5">
            <InputGroup.Text id="inputGroup-sizing-default">
              <p className="fw-bold m-0">Tagline</p>
            </InputGroup.Text>
            <FormControl
              {...register("updatedTagline", { required: true })}
              defaultValue={tagline}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          {errors.updatedTagline && (
            <p className="error-message">This field is required</p>
          )}
          <InputGroup className="pb-3 px-5">
            <InputGroup.Text id="inputGroup-sizing-default">
              <p className="fw-bold m-0">Body</p>
            </InputGroup.Text>
            <textarea
              {...register("updatedBody", { required: true })}
              defaultValue={body}
              rows="8"
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          {errors.updatedBody && (
            <p className="error-message">This field is required</p>
          )}

          <Modal.Footer>
            <button className="btn btn-success" type="submit">
              Update
            </button>
            <Button className="btn btn-danger" onClick={deleteNote}>
              Delete
            </Button>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default NoteDetailsModal;
