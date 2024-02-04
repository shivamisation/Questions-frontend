import React from 'react';
import { Box, Grid, Card, CardContent, Typography, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const Questions = ({ questions, onDelete }) => {

  // Function to render stars based on a value
  const renderStars = (value) => {
    return (
      <Box>
        {Array.from({ length: 5 }, (_, i) => (
          i < value ? <StarIcon key={i} fontSize='small' /> : <StarBorderIcon key={i} fontSize='small'/>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ margin: '20px', padding: '20px', backgroundColor: 'black', borderRadius: '8px' }}>
      <Grid container spacing={2}>
        {questions.map((question, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{
              position: 'relative',
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
              {/* Tooltip for question details */}
              <Tooltip
                title={
                  <Box>
                    <Typography variant="caption">Diff: {renderStars(question.difficulty)}</Typography>
                    <Typography variant="caption">Imp: {renderStars(question.importance)}</Typography>
                    <Typography variant="caption">Hint: {question.hint || "No hint"}</Typography>
                  </Box>
                }
                arrow
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {question.name}
                  </Typography>
                </CardContent>
              </Tooltip>
              {/* Delete button */}
              <IconButton 
                onClick={() => onDelete(question.name)}
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  color: 'white',
                  '&:hover': {
                    color: 'red'
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Questions;
