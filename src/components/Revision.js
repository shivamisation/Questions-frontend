import React, { useState , useEffect } from "react";
import RevisionQuestions from "./RevisionQuestions";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
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
  Grid
} from "@mui/material";
const Revision = ({data}) => {
  const hasQuestions = data && data.revisionQuestions && data.revisionQuestions.length > 0;

  return(
    <Box sx={{pt:"10vh" , justifyContent:"center"}}>
 {hasQuestions ? (
        <RevisionQuestions questions={data.revisionQuestions} />
      ) : (
        <Typography variant="h6" sx={{mt:"10vh", color: 'grey.600' }}>
          The questions you solved yesterday, 3, 7, 21, and 30 days ago will appear here,
          so that you never forget them 😊
        </Typography>
      )}</Box>

  )

 
  
};

export default Revision;
