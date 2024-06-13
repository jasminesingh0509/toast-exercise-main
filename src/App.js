import React, { useState } from "react";
import Container from "@mui/material/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Content from "./Content";
import { createMockFormSubmission } from "./service/mockServer";

function App() {
  const [submissions, setSubmissions] = useState([]);

  const handleNewSubmission = () => {
    createMockFormSubmission()
      .then((formSubmission) => {
        setSubmissions([...submissions, formSubmission]);
        toast.success(
          `Form submitted successfully! Name: ${formSubmission.data.firstName} ${formSubmission.data.lastName}, Email: ${formSubmission.data.email}`,
          {
            position: toast.POSITION.BOTTOM_CENTER
          }
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Header onNewSubmission={handleNewSubmission} />
      <Container>
        <Content submissions={submissions} />
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
