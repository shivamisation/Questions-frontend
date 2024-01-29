import React, { useState } from "react";
import { Box, Button, Divider } from "@mui/material";
import { Avatar, Tooltip, Typography } from "@mui/material";


const Navbar = ({data, totalProblemsDone , onPageChange }) => {
  const [activeButton, setActiveButton] = useState(null);
  console.log("total...",totalProblemsDone)

  const userInitial = data?.username ? data.username[0].toUpperCase() : '?';





  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    onPageChange(buttonName === "Button1" ? "Homepage" : buttonName === "Button2" ? "Revision" : "Calandar");
};


  return (
    <Box
      sx={{
        display: "flex",
        position: "fixed",
        backgroundColor: "black",
        top: 0,
        left: 0,
        right: 0,
        justifyContent: "space-between",
        width: "100%",
        // alignItems: "space-between",
        height: "10vh", // Optional: Set the height to make it take the full viewport height
      }}
    >
      <Tooltip title={data?.username || 'User'}>
        <Avatar sx={{ bgcolor: '#8BC34A', cursor: 'pointer', ml: 2 , mt:2 }}>
          {userInitial}
        </Avatar>
      </Tooltip>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "black",
          mt: "4px",
          mx: "10px",
          width: "100%",
          textAlign: "center", // Optional: Center text inside the box
          padding: "6px", // Optional: Add some padding for better aesthetics
        }}
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: "20px",
            width: "300px",
            backgroundColor:
              activeButton === "Button1" ? "#8BC34A" : "transparent",
              border: '1px solid white',

            "&:hover": {
              backgroundColor: "#8BC34A",
              boxShadow: "0 0 10px 3px #8BC34A", // Add a glowing shadow on hover
            },
          }}
          onClick={() => handleButtonClick("Button1")}
        >
          Today {totalProblemsDone > 0 && `${totalProblemsDone}`}
        </Button>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            height: "100%", // Adjust the height of the divider as needed
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust the color and opacity
          }}
        />

        <Button
          variant="contained"
          sx={{
            borderRadius: "20px",
            width: "300px",
            backgroundColor:
              activeButton === "Button2" ? "#8BC34A" : "transparent",
              border: '1px solid white',

            "&:hover": {
              backgroundColor: "#8BC34A",
              boxShadow: "0 0 10px 3px #8BC34A", // Add a glowing shadow on hover
            },
          }}
          onClick={() => handleButtonClick("Button2")}
        >
          Revision
        </Button>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            height: "100%", // Adjust the height of the divider as needed
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust the color and opacity
          }}
        />

        <Button
          variant="contained"
          sx={{
            borderRadius: "20px",
            width: "300px",
            backgroundColor:
              activeButton === "Button3" ? "#8BC34A" : "transparent",
              border: '1px solid white',

            "&:hover": {
              backgroundColor: "#8BC34A",
              boxShadow: "0 0 10px 3px #8BC34A", // Add a glowing shadow on hover
            },
          }}
          onClick={() => handleButtonClick("Button3")}
        >
          Consistency
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
