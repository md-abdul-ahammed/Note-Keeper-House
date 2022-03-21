import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { db } from "../../Firebase/firebase.config";
import "./CreateNoteModal.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function CreateNoteModal(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const notesCollectionRef = collection(db, "notesCollection");

  const createNotes = async (title, tagline, body) => {
    await addDoc(notesCollectionRef, {
      title,
      tagline,
      body,
      timestamp: serverTimestamp(),
      isPin: false,
    });
    props.onHide();
    toast.success("Successfully Added Your Note!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const onSubmit = (data) => {
    createNotes(data.title, data.tagline, data.body);
    reset();
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
              {...register("title", { required: true })}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          {errors.title && (
            <p className="error-message">This field is required</p>
          )}
          <InputGroup className="pb-3 px-5">
            <InputGroup.Text id="inputGroup-sizing-default">
              <p className="fw-bold m-0">Tagline</p>
            </InputGroup.Text>
            <FormControl
              {...register("tagline", { required: true })}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          {errors.tagline && (
            <p className="error-message">This field is required</p>
          )}
          <InputGroup className="pb-3 px-5">
            <InputGroup.Text id="inputGroup-sizing-default">
              <p className="fw-bold m-0">Body</p>
            </InputGroup.Text>
            <textarea
              {...register("body", { required: true })}
              rows="8"
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          {errors.body && (
            <p className="error-message">This field is required</p>
          )}

          <Modal.Footer>
            <Button type="submit">Crate Note</Button>
          </Modal.Footer>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default CreateNoteModal;
