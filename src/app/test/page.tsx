'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use this for programmatic navigation
import styles from './page.module.css'; // Import the CSS module
// import Link from "next/link";
// import Button from '../components/ui/button';
// import Input from '../components/ui/input';
import { Moon, Sun } from "lucide-react";
import NavBar from '../components/ui/navbar';

const questions = [
  'I enjoy solving complex puzzles and problems for extended periods.',
  'I prefer working on back-end systems and optimizing server performance rather than designing user interfaces.',
  'I feel most comfortable when following well-defined structures and processes in my work.',
  'When approaching a problem, I focus on its broader impact rather than the specific details.',
  'I enjoy creating algorithms or programs from scratch that improve existing workflows.',
  'I prefer working independently rather than collaborating with a team on projects.',
  'I handle stress well in high-pressure environments and tight deadlines.',
  'I enjoy the process of debugging and troubleshooting more than the initial project planning.',
  'I prefer to explore new technologies and frameworks, even if they are not widely used yet.',
  'I am skilled at simplifying complex concepts when explaining them to others.',
  'I thrive in situations where I am leading a team and making executive decisions.',
  'I get energized by designing visually appealing and user-friendly interfaces.',
  'I prefer building secure systems over improving performance metrics.',
  'I feel comfortable experimenting with machine learning algorithms and data science applications.',
  'I am more motivated by the end result of a project than the journey of getting there.',
  'I enjoy working on mobile app development over web-based applications.',
  'I believe understanding business needs is more important than the technical specifications when developing a solution.',
  'I prioritize learning new programming languages and tools over mastering a specific set of skills.',
  'I am more drawn to roles that involve data analysis and statistical models than those requiring front-end design.',
  'I believe cybersecurity is one of the most crucial areas to focus on in the IT industry today.',
];

const SurveyPage = () => {
  const [responses, setResponses] = useState(Array(questions.length).fill(''));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [modalText, setModalText] = useState('');
  const [showModal, setShowModal] = useState(false);
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  // const [theme, setTheme] = useState('light');
  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter(); // Initialize router for programmatic navigation

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setIsUserLoggedIn(Boolean(localStorage.getItem('jwt')));
  //   }
  // }, []);

  const handleResponseChange = (response: string) => {
    setResponses((prevResponses) => {
      const newResponses = [...prevResponses];
      newResponses[currentQuestionIndex] = response;
      return newResponses;
    });
  };

  // const toggleTheme = () => {
  //   const newTheme = theme === 'light' ? 'dark' : 'light';
  //   setTheme(newTheme);
  //   localStorage.setItem('theme', newTheme);

  //   if (newTheme === 'dark') {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // };

  const handleNextQuestion = () => {
    if (responses[currentQuestionIndex] === '') {
      setModalText('Please select an answer before moving to the next question.');
      setShowModal(true);
      return;
    }
    setShowModal(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setShowModal(false);
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (responses[currentQuestionIndex] === '') {
      setModalText('Please answer the question before submitting.');
      setShowModal(true);
      return;
    }

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: responses }), // Using responses as answers
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analysis');
      }

      const data = await response.json();
      // Navigate to result page with the analysis data
      router.push(`/dashboard/result?analysis=${encodeURIComponent(data.analysis)}`);
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.container}>
        <div className={styles.surveyBox}>
          <h1 className={styles.heading}>Career Test</h1>

          <div className={styles.questionContainer}>
            <p className={styles.questionText}>{`${currentQuestionIndex + 1}. ${currentQuestion}`}</p>
            {['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'].map((response) => (
              <label key={response} className={styles.answerOption}>
                <input
                  type="radio"
                  value={response}
                  checked={responses[currentQuestionIndex] === response}
                  onChange={() => handleResponseChange(response)}
                  style={{ marginRight: '10px' }}
                />
                {response}
              </label>
            ))}
          </div>

          {showModal && <div className={styles.modal}>{modalText}</div>}

          <div className={styles.buttonContainer}>
            {currentQuestionIndex > 0 && (
              <button onClick={handlePreviousQuestion} className={styles.button}>
                Previous
              </button>
            )}

            {currentQuestionIndex < questions.length - 1 ? (
              <button onClick={handleNextQuestion} className={styles.button}>
                Next
              </button>
            ) : (
              <button onClick={handleSubmit} className={styles.button}>
                Submit
              </button>
            )}
          </div>
        </div>
    </div>
  );
};

export default SurveyPage;
