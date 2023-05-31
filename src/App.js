import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizApp from './QuizApp';
import AdminOptions from './AdminOptions';
import ViewQuestions from "./AdminOperations/ViewQuestions";
import CreateQuestions from "./AdminOperations/CreateQuestions";
import EditQuestions from "./AdminOperations/EditQuestions";
import AttemptQuiz from "./UserOperations/AttemptQuiz";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<QuizApp />} />
            <Route path="/admin" element={<AdminOptions />} />
            <Route path="/admin/view-questions" element={<ViewQuestions/>} />
            <Route path="/admin/create-questions" element={<CreateQuestions/>} />
            <Route  path="/admin/edit/:id" element={<EditQuestions/>} />
            <Route path={"/user"} element={<AttemptQuiz/>} />
        </Routes>
      </Router>
  );
};

export default App;
