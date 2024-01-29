import "./App.css";
import { useState ,useEffect} from "react";
import Homepage from "./components/Homepage";
import Calandar from "./components/Calandar";
import Revision from "./components/Revision";
import Navbar from "./components/Navbar";
import LoginForm from "./components/Login";
import SignupForm from "./components/Signup";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';


const App = () => {
  const [page, setPage] = useState("login"); // 'login', 'signup', or 'homepage'
  const [totalProblemsDone, setTotalProblemsDone] = useState(0);
  const [userData, setUserData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog state

  useEffect(() => {
    if (userData) {
      // Open the dialog when the user successfully logs in or signs up
      setIsDialogOpen(true);
    }
  }, [userData]); 

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const showSignupForm = () => {
    setPage("signup");
  };
  const showLoginForm = () =>{
    setPage("login")
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch("https://disturbed-question-production.up.railway.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        setPage("Homepage");
        const data = await response.json();
        setUserData(data); // Store user data
      } else if (response.status === 401) {
        setSnackbarMessage("Invalid username/password");
        setSnackbarOpen(true);
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleSignup = async (username, password) => {
    try {
      const response = await fetch("https://disturbed-question-production.up.railway.app/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        setPage("Homepage");
        const data = await response.json();
        setUserData(data); // Store user data
      }else if (response.status === 409) {
        // Username already taken, show snackbar
        setSnackbarMessage("This username is already taken");
        setSnackbarOpen(true);
      } else {
        // Other types of errors
        setSnackbarMessage("Signup failed. Please try again later.");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const renderPage = () => {
    switch (page) {
      case "Homepage":
        return (
          <Homepage
            setTotalProblemsDone={setTotalProblemsDone}
            data={userData}
          />
        );
      case "Revision":
        return <Revision data={userData} />;
      case "Calandar":
        return <Calandar />;
      case "login":
        return (
          <LoginForm onLogin={handleLogin} onShowSignup={showSignupForm} />
        );
      case "signup":
        return <SignupForm onSignup={handleSignup} onShowLogin={showLoginForm} />;
      default:
        return (
          <LoginForm onLogin={handleLogin} onShowSignup={showSignupForm} />
        );
    }
  };

  console.log("this is the user data.....", userData);

  return (
    <div className="App" style={{ backgroundColor: "black", height: "100vh" }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // This will position it at the top-center
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="error"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiPaper-root': { // Targeting the Paper component inside the Dialog
            backgroundColor: 'light-yellow', // Greyish-black background
            color: 'black', // White text
          }
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"🚧 Site Under Construction 🚧"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hey there! 👋 Just a heads-up: this awesome site is still a work-in-progress, so things might get a bit wacky. We're talking potential server meltdowns 🌋 and uncharted digital chaos! 🌀 So, please use it wisely and avoid testing our patience with any funny business. We promise to get all the kinks ironed out soon. Thanks for being cool! 😎
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            Got it!
          </Button>
        </DialogActions>
      </Dialog>
      {userData && (
        <Navbar
          data={userData}
          totalProblemsDone={totalProblemsDone}
          onPageChange={handlePageChange}
        />
      )}{" "}
      {/* <button onClick={() => setPage("Home")}>Home</button>
      <button onClick={() => setPage("Revision")}>Revision</button>
      <button onClick={() => setPage("Calandar")}>Consistency</button> */}
      {renderPage()}
      {/* <Login></Login> */}
    </div>
  );
};

export default App;
