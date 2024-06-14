import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Content from "./Content";
import Button from "@mui/material/Button";
import {
  createMockFormSubmission,
  fetchLikedFormSubmissions,
  saveLikedFormSubmission
} from "./service/mockServer";

function App() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const data = await fetchLikedFormSubmissions();
        setSubmissions(data.formSubmissions);
      } catch (error) {
        console.error(error);
      }
    };
    loadSubmissions();
  }, []);

  const handleNewSubmission = () => {
    createMockFormSubmission()
      .then((formSubmission) => {
        setSubmissions((prevSubmissions) => [
          ...prevSubmissions,
          formSubmission
        ]);
        toast.info(
          `Name: ${formSubmission.data.firstName} ${formSubmission.data.lastName} \n Email: ${formSubmission.data.email}`,
          {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 5000,
            closeButton: (
              <>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => {
                    formSubmission.data.liked = true;
                    saveLikedFormSubmission(formSubmission)
                      .then((response) => {
                        if (response.status === 202) {
                          handleLikedSubmission(formSubmission);
                          toast.success("Submission liked successfully!", {
                            position: toast.POSITION.BOTTOM_CENTER
                          });
                        } else {
                          toast.error("Failed to save liked submission", {
                            position: toast.POSITION.BOTTOM_CENTER
                          });
                        }
                      })
                      .catch((error) => {
                        toast.error(
                          `Error saving liked submission: ${error.message}`,
                          {
                            position: toast.POSITION.BOTTOM_CENTER
                          }
                        );
                      });
                    toast.dismiss();
                  }}
                >
                  Like
                </Button>
              </>
            )
          }
        );
      })
      .catch((error) => console.error(error));
  };

  const handleLikedSubmission = (formSubmission) => {
    setSubmissions((prevSubmissions) =>
      prevSubmissions.map((submission) =>
        submission.id === formSubmission.id ? formSubmission : submission
      )
    );
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
