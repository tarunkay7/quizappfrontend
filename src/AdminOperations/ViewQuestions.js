import React, { useEffect, useState } from 'react';
import { Slider, Typography, Paper, Grid, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import LiveBackground from '../LiveBackground';

const OptionPaper = styled(Paper)(({ theme, isCorrect }) => ({
    padding: '8px',
    borderRadius: '50px',
    backgroundColor: isCorrect ? theme.palette.success.main : theme.palette.warning.main,
}));

const ViewQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/quizzes/all')
            .then((response) => response.json())
            .then((data) => {
                setQuestions(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleSliderChange = (event, newValue) => {
        setCurrentQuestion(newValue);
    };

    const handleDeleteQuestion = (id) => {
        fetch(`http://localhost:8080/quizzes/delete/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log('Delete Success');
                    toast.info('Question successfully deleted');
                    // Reload questions after deletion
                    fetch('http://localhost:8080/quizzes/all')
                        .then((response) => response.json())
                        .then((data) => {
                            setQuestions(data);
                            if (currentQuestion >= data.length) {
                                setCurrentQuestion(data.length - 1);
                            }
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                } else {
                    console.error('Delete Failed');
                    toast.error('Failed to delete question');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    if (questions.length === 0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6">No question to view</Typography>
            </div>
        );
    }

    const currentOptions = questions[currentQuestion]?.options || [];
    const correctOptionIndex = questions[currentQuestion]?.correctOption;

    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            <LiveBackground />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'relative', zIndex: 1 }}>
                <Paper elevation={24} style={{ padding: '2rem', borderRadius: '20px', display: 'inline-block' }}>
                    <Slider
                        value={currentQuestion}
                        min={0}
                        max={questions.length - 1}
                        step={1}
                        onChange={handleSliderChange}
                        marks={questions.map((question, index) => ({ value: index, label: `Q${index + 1}` }))}
                    />
                    <Paper elevation={24} style={{ padding: '16px', marginTop: '16px' }}>
                        <Typography variant="h6" style={{ marginBottom: '8px', textAlign: 'center' }}>
                            {questions[currentQuestion]?.question}
                        </Typography>
                        <Typography variant="body1" style={{ marginBottom: '8px', textAlign: 'center' }}>
                            <strong>Options:</strong>
                        </Typography>
                        <Grid container spacing={2} justifyContent="center">
                            {currentOptions.map((option, index) => (
                                <Grid item key={index}>
                                    <OptionPaper variant="outlined" isCorrect={index === correctOptionIndex}>
                                        <Typography variant="body1" style={{ textAlign: 'center' }}>
                                            {option}
                                        </Typography>
                                    </OptionPaper>
                                </Grid>
                            ))}
                        </Grid>
                        <Typography variant="body1" style={{ marginTop: '8px', textAlign: 'center' }}>
                            <strong>Answer:</strong> {currentOptions[correctOptionIndex]}
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                            <IconButton
                                color="secondary"
                                aria-label="delete"
                                onClick={() => handleDeleteQuestion(questions[currentQuestion].id)}
                                style={{ marginRight: '8px' }}
                            >
                                <Delete />
                            </IconButton>
                            <IconButton
                                component={Link}
                                to={`/admin/edit/${questions[currentQuestion].id}`}
                                color="primary"
                                aria-label="edit"
                            >
                                <Edit />
                            </IconButton>
                        </div>
                    </Paper>
                </Paper>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ViewQuestions;
