import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuizContextType {
  questions: Question[];
  currentQuestion: number;
  score: number;
  finished: boolean;
  addQuestion: (question: Question) => void;
  answerQuestion: (answer: string) => void;
  resetQuiz: () => void;
}

const initialQuestions: Question[] = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
    answer: "Harper Lee",
  },
];

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const addQuestion = (question: Question) => {
    setQuestions([...questions, question]);
  };

  const answerQuestion = (answer: string) => {
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      setFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setFinished(false);
  };

  return (
    <QuizContext.Provider value={{
      questions,
      currentQuestion,
      score,
      finished,
      addQuestion,
      answerQuestion,
      resetQuiz
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};