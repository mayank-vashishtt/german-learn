
import React, { createContext, useContext, useState } from 'react';
import { Lesson } from '../data/lessons';

interface LearningContextType {
  currentLesson: Lesson | null;
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: string | null;
  isAnswerChecked: boolean;
  isLessonComplete: boolean;
  setCurrentLesson: (lesson: Lesson) => void;
  selectAnswer: (answer: string) => void;
  checkAnswer: () => void;
  nextQuestion: () => void;
  restartLesson: () => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isLessonComplete, setIsLessonComplete] = useState(false);

  const selectAnswer = (answer: string) => {
    if (!isAnswerChecked) {
      setSelectedAnswer(answer);
    }
  };

  const checkAnswer = () => {
    if (selectedAnswer) {
      setIsAnswerChecked(true);
      
      if (currentLesson && selectedAnswer === currentLesson.exercises[currentQuestionIndex].answer) {
        setScore((prev) => prev + 1);
      }
    }
  };

  const nextQuestion = () => {
    if (currentLesson) {
      if (currentQuestionIndex < currentLesson.exercises.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswerChecked(false);
      } else {
        setIsLessonComplete(true);
      }
    }
  };

  const restartLesson = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setIsLessonComplete(false);
  };

  return (
    <LearningContext.Provider
      value={{
        currentLesson,
        currentQuestionIndex,
        score,
        selectedAnswer,
        isAnswerChecked,
        isLessonComplete,
        setCurrentLesson,
        selectAnswer,
        checkAnswer,
        nextQuestion,
        restartLesson,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
