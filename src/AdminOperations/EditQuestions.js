import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import LiveBackground from '../LiveBackground';

const CustomDiv = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    position: 'relative',
    zIndex: 1, // Set a higher value for the zIndex
});

const EditQuestions = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [correctOption, setCorrectOption] = useState(0);
    const [technology, setTechnology] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8080/quizzes/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setQuestion(data.question);
                setOptions(data.options);
                setCorrectOption(data.correctOption);
                setTechnology(data.technology);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleOptionChange = (event, index) => {
        const updatedOptions = [...options];
        updatedOptions[index] = event.target.value;
        setOptions(updatedOptions);
    };

    const handleCorrectOptionChange = (event) => {
        setCorrectOption(event.target.value);
    };

    const handleTechnologyChange = (event) => {
        setTechnology(event.target.value);
    };

    const handleUpdateQuiz = () => {
        const updatedQuiz = {
            question,
            options,
            correctOption,
            technology,
        };

        fetch(`http://localhost:8080/quizzes/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedQuiz),
        })
            .then((response) => {
                if (response.ok) {
                    return response.text(); // Return the response as text
                } else {
                    throw new Error('Update Failed'); // Throw an error if the update failed
                }
            })
            .then((data) => {
                console.log('Update Success:', data);
                // Handle the successful update if needed
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            <LiveBackground />
            <CustomDiv>
                <Paper elevation={24} style={{ width: '600px', padding: '16px', position: 'relative', zIndex: 2 }}>
                    <Typography variant="h6" style={{ marginBottom: '16px', textAlign: 'center' }}>
                        Edit Question
                    </Typography>
                    <TextField
                        label="Question"
                        variant="outlined"
                        fullWidth
                        value={question}
                        onChange={handleQuestionChange}
                        style={{ marginBottom: '16px' }}
                    />
                    {options.map((option, index) => (
                        <TextField
                            key={index}
                            label={`Option ${index + 1}`}
                            variant="outlined"
                            fullWidth
                            value={option}
                            onChange={(event) => handleOptionChange(event, index)}
                            style={{ marginBottom: '16px' }}
                        />
                    ))}
                    <TextField
                        label="Correct Option"
                        variant="outlined"
                        fullWidth
                        value={correctOption}
                        onChange={handleCorrectOptionChange}
                        style={{ marginBottom: '16px' }}
                    />
                    <TextField
                        label="Technology"
                        variant="outlined"
                        fullWidth
                        value={technology}
                        onChange={handleTechnologyChange}
                        style={{ marginBottom: '16px' }}
                    />
                    <Button variant="contained" color="primary" onClick={handleUpdateQuiz}>
                        Update
                    </Button>
                </Paper>
            </CustomDiv>
        </div>
    );
};

export default EditQuestions;
