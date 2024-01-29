import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import Questions from "./Questions"; // Import the new Questions component



const Homepage = ({ setTotalProblemsDone, data }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [hints, setHints] = useState("");
  const [difficulty, setDifficulty] = useState(3);
  const [importance, setImportance] = useState(3);
  const [openAlert, setOpenAlert] = useState(false);
  const [validationAlertOpen, setValidationAlertOpen] = useState(false);
  const [linkError, setLinkError] = useState(false);

  const urlRegex = new RegExp('^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator




  // const [totalProblemsDone, setTotalProblemsDone] = useState(0);

  useEffect(() => {
    if (data && data.todaysQuestions) {
      setQuestions(data.todaysQuestions);
      setTotalProblemsDone(data.todaysQuestions.length);
    }
  }, [data]);

   // Function to validate the link
   const validateLink = () => {
    if (!urlRegex.test(link)) {
      setLinkError(true);
      return false;
    }
    setLinkError(false);
    return true;
  };

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    // Clear form fields when closing the dialog
    setName("");
    setLink("");
    setHints("");
    setDifficulty(3);
    setImportance(3);
  };

  const handleDeleteQuestion = async (questionName) => {
    console.log(questionName);
    try {
      // Getting today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split("T")[0];

      // Constructing the query parameters string
      const queryParams = new URLSearchParams({
        username: data.username,
        questionName: questionName,
        dateSolved: today,
      }).toString();

      const response = await fetch(
        `https://disturbed-question-production.up.railway.app/api/user-questions/delete?${queryParams}`,
        {
          method: "DELETE",
          // Include headers if necessary, e.g., for authentication
        }
      );
      console.log(response);

      if (response.ok) {
        // Update the local state to remove the question
        console.log(questions);

        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.name !== questionName)
        );
        setTotalProblemsDone((prevCount) => prevCount - 1);

        console.log(questions);
      } else {
        console.error("Failed to delete question");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleOkClick = () => {
    if (name.trim() === '' || link.trim() === '') {
      setValidationAlertOpen(true);
      return;
    }
  
    // Next, validate the link format
    if (!validateLink()) {
      setLinkError(true);
      return;
    }
    const newQuestion = {
      name,
      link,
      hints,
      difficulty,
      importance,
    };
    if (questions.some((question) => question.name === newQuestion.name)) {
      setOpenAlert(true); // Open the alert
      return; // Prevent adding the question
    }
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);

    addQuestion(newQuestion);

    // Clear form fields and close the dialog
    setName("");
    setLink("");
    setHints("");
    setDifficulty(3);
    setImportance(3);
    setIsDialogOpen(false);
  };

  const addQuestion = async (newQuestion) => {
    try {
      const params = new URLSearchParams({
        username: data.username,
        questionName: newQuestion.name,
        link: newQuestion.link,
        hint: newQuestion.hints,
        difficulty: newQuestion.difficulty,
        importance: newQuestion.importance,
      }).toString();

      const response = await fetch(
        `https://disturbed-question-production.up.railway.app/api/user-questions/add-question?${params}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.ok) {
        const addedQuestion = await response.json();

        setTotalProblemsDone((prevCount) => prevCount + 1);
      } else {
        console.log("Failed to add question");
      }
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <Box
      sx={{
        pt: "10vh",
        // display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        // backgroundColor:'black',

        // height: "100vh",
      }}
    >
      {/* Plus button to add questions */}

      {/* Question form dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Question</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Link"
            variant="outlined"
            fullWidth
            margin="normal"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <TextField
            label="Hints"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={hints}
            onChange={(e) => setHints(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Difficulty</InputLabel>
            <Slider
              value={difficulty}
              min={1}
              max={5}
              onChange={(e, value) => setDifficulty(value)}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Importance</InputLabel>
            <Slider
              value={importance}
              min={1}
              max={5}
              onChange={(e, value) => setImportance(value)}
            />
          </FormControl>
        </DialogContent>
        <Button onClick={handleOkClick}>OK</Button>
      </Dialog>

      <Snackbar
        open={validationAlertOpen}
        autoHideDuration={6000}
        onClose={() => setValidationAlertOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        sx={{
          '& .MuiSnackbar-root': {
            animation: 'enterAnimation 2500ms ease-in-out',
          },
          '@keyframes enterAnimation': {
            '0%': { transform: 'translateX(-100%)' },
            '30%': { transform: 'translateX(0)' },
            '70%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(100%)' },
          }
        }}np
        TransitionProps={{ direction: "left" }}
      >
        <Alert
          onClose={() => setValidationAlertOpen(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Name and Link cannot be empty!
        </Alert>
      </Snackbar>

      <Snackbar
        open={linkError}
        autoHideDuration={6000}
        onClose={() => setValidationAlertOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        sx={{
          '& .MuiSnackbar-root': {
            animation: 'enterAnimation 2500ms ease-in-out',
          },
          '@keyframes enterAnimation': {
            '0%': { transform: 'translateX(-100%)' },
            '30%': { transform: 'translateX(0)' },
            '70%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(100%)' },
          }
        }}np
        TransitionProps={{ direction: "left" }}
      >
        <Alert
          onClose={() => setValidationAlertOpen(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          Enter a valid link buddy ! 
        </Alert>
      </Snackbar>


      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setLinkError(false)}
      >
        <Alert
          onClose={() => setLinkError(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          A question with the same name already exists.
        </Alert>
      </Snackbar>
      <Questions questions={questions} onDelete={handleDeleteQuestion} />
      <Tooltip title="Add question">
        <Button
          variant="contained"
          color="primary"
          size="large"
          //   startIcon={<AddIcon />}
          onClick={handleButtonClick}
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            width: "80px",
            height: "80px",
            backgroundColor: "#8BC34A",
            "&:hover": {
              backgroundColor: "#8BC34A",
              boxShadow: "0 0 10px 3px #8BC34A",
            },
          }}
        >
          +
        </Button>
      </Tooltip>
    </Box>
  );
};

export default Homepage;
