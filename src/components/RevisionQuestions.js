import React from 'react';
import { Box, Grid, Card, CardContent, Typography, IconButton , Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';


const RevisionQuestions = ({ questions }) => {
    const handleCardClick = (link) => {
        window.open(link, "_blank"); // Opens the link in a new tab
      };

      const renderStars = (value) => {
        return (
          <Box>
            {Array.from({ length: 5 }, (_, i) => (
              i < value ? <StarIcon key={i} fontSize='small' /> : <StarBorderIcon key={i} fontSize='small'/>
            ))}
          </Box>
        );
      };
    
  console.log("from the question component",questions)
  return (
    <Box sx={{ margin: '20px', padding: '20px', backgroundColor: 'black', borderRadius: '8px' }}>
      <Grid container spacing={2}>
        {questions.map((question, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
             onClick={() => handleCardClick(question.link)}
             sx={{
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
                <Tooltip
                title={
                  <Box>
                    <Typography variant="caption">Diff: {renderStars(question.difficulty)}</Typography>
                    <Typography variant="caption">Imp: {renderStars(question.importance)}</Typography>
                    <Typography variant="caption">Hint: {question.hints || "No hint"}</Typography>
                  </Box>
                }
                arrow
              ></Tooltip>
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
