import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, FormControlLabel, Radio, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import LiveBackground from '../LiveBackground';

const CustomDiv = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    position: 'relative',
    zIndex: 1,
});

const AttemptQuiz = () => {
    const { id = 1 } = useParams();
    const [quizzes, setQuizzes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/quizzes/all')
            .then((response) => response.json())
            .then((data) => {
                setQuizzes(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleOptionChange = (event) => {
        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [currentIndex]: event.target.value,
        }));
    };

    const handleNext = () => {
        if (
            selectedOptions[currentIndex] !== undefined &&
            parseInt(selectedOptions[currentIndex]) === quizzes[currentIndex].correctOption
        ) {
            setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
        }
        if (currentIndex + 1 < quizzes.length) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleRetakeQuiz = () => {
        setCurrentIndex(0);
        setSelectedOptions({});
        setCorrectAnswers(0);
        setShowResult(false);
    };

    if (!quizzes || quizzes.length === 0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h3>No quizzes found</h3>
            </div>
        );
    }

    if (showResult) {
        return (
            <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
                <LiveBackground />
                <CustomDiv>
                    <Paper elevation={24} style={{ padding: '24px', maxWidth: '600px', textAlign: 'center', zIndex: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            Quiz Results
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Correct Answers: {correctAnswers}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleRetakeQuiz} style={{ marginTop: '16px' }}>
                            Retake Quiz
                        </Button>
                    </Paper>
                </CustomDiv>
            </div>
        );
    }

    const currentQuestion = quizzes[currentIndex];

    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            <LiveBackground />
            <CustomDiv>
                <Paper elevation={24} style={{ padding: '24px', maxWidth: '600px', zIndex: 2 }}>
                    <Typography variant="h5" gutterBottom>
                        Question {currentQuestion.id}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {currentQuestion.question}
                    </Typography>
                    <div>
                        {currentQuestion.options.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                value={index}
                                control={<Radio />}
                                label={option}
                                checked={selectedOptions[currentIndex] === String(index)}
                                onChange={handleOptionChange}
                                style={{ marginBottom: '8px' }}
                            />
                        ))}
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled={selectedOptions[currentIndex] === undefined}
                        style={{ marginTop: '16px' }}
                    >
                        {currentIndex + 1 === quizzes.length ? 'Finish Quiz' : 'Next Question'}
                    </Button>
                </Paper>
            </CustomDiv>
        </div>
    );
};

export default AttemptQuiz;
