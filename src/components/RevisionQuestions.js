import React from 'react';
import { Box, Grid, Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const RevisionQuestions = ({ questions }) => {
  console.log("from the question component",questions)
  return (
    <Box sx={{ margin: '20px', padding: '20px', backgroundColor: 'black', borderRadius: '8px' }}>
      <Grid container spacing={2}>
        {questions.map((question, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{
              position: 'relative', // Provide a positioning context
              backgroundColor: 'black',
              color: 'white',
              border: '1px solid white',
              '&:hover': {
                backgroundColor: "#8BC34A",
                borderColor: 'white'
              },
              cursor: 'pointer',
              transition: 'background-color 0.3s, border-color 0.3s'
            }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {question.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RevisionQuestions;
