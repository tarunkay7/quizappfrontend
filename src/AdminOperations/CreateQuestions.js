import React, { useState } from 'react';
import { Button, TextField, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import LiveBackground from '../LiveBackground';

const CustomPaper = styled(Paper)({
    position: 'relative',
    zIndex: 1,
    padding: '16px',
    width: '400px',
});

const CreateQuestion = () => {
    const [id, setId] = useState('');
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '']);
    const [correctOption, setCorrectOption] = useState(0);
    const [technology, setTechnology] = useState('');

    const handleAddOption = () => {
        if (options.length < 5) {
            setOptions((prevOptions) => [...prevOptions, '']);
        }
    };

    const handleOptionChange = (index, value) => {
        setOptions((prevOptions) => {
            const updatedOptions = [...prevOptions];
            updatedOptions[index] = value;
            return updatedOptions;
        });
    };

    const handleSubmit = () => {
        const formData = {
            id,
            question,
            options,
            correctOption,
            technology,
        };

        fetch('http://localhost:8080/quizzes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Handle the response from the backend if needed
                toast.success('Form submitted successfully');
                setId('');
                setQuestion('');
                setOptions(['', '', '']);
                setCorrectOption(0);
                setTechnology('');
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Failed to submit form');
            });
    };

    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            <LiveBackground />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'relative', zIndex: 1 }}>
                <CustomPaper elevation={24}>
                    <TextField label="ID" fullWidth value={id} onChange={(event) => setId(event.target.value)} />
                    <TextField label="Question" fullWidth value={question} onChange={(event) => setQuestion(event.target.value)} />
                    {options.map((option, index) => (
                        <TextField
                            key={index}
                            label={`Option ${index + 1}`}
                            fullWidth
                            value={option}
                            onChange={(event) => handleOptionChange(index, event.target.value)}
                        />
                    ))}
                    <Button variant="outlined" color="primary" onClick={handleAddOption} style={{ marginTop: '8px' }}>
                        Add Option
                    </Button>
                    <TextField
                        label="Correct Option"
                        type="number"
                        fullWidth
                        value={correctOption}
                        onChange={(event) => setCorrectOption(parseInt(event.target.value))}
                    />
                    <TextField label="Technology" fullWidth value={technology} onChange={(event) => setTechnology(event.target.value)} />
                    <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '16px' }}>
                        Submit
                    </Button>
                    <ToastContainer />
                </CustomPaper>
            </div>
        </div>
    );
};

export default CreateQuestion;
