
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Lesson } from '../data/lessons';
import { toast } from "@/hooks/use-toast";

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

  // Debug logging for the current state
  console.log("LearningContext state:", {
    hasCurrentLesson: !!currentLesson,
    currentQuestionIndex,
    score,
    selectedAnswer,
    isAnswerChecked,
    isLessonComplete
  });

  const selectAnswer = useCallback((answer: string) => {
    console.log("selectAnswer called with:", answer);
    setSelectedAnswer(answer);
  }, []);

  const checkAnswer = useCallback(() => {
    console.log("checkAnswer called, current selectedAnswer:", selectedAnswer);
    
    if (selectedAnswer === null) {
      console.warn("checkAnswer called with no selectedAnswer");
      toast({
        title: "No answer selected",
        description: "Please select an answer before checking",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnswerChecked(true);
    
    if (currentLesson && selectedAnswer === currentLesson.exercises[currentQuestionIndex].answer) {
      setScore((prev) => prev + 1);
      console.log("Correct answer! New score:", score + 1);
      toast({
        title: "Correct!",
        description: "Great job! That's the right answer.",
        variant: "default"
      });
    } else {
      console.log("Wrong answer. Current score:", score);
      toast({
        title: "Incorrect",
        description: "That's not the right answer. Try again next time!",
        variant: "destructive"
      });
    }
  }, [currentLesson, currentQuestionIndex, selectedAnswer, score]);

  const nextQuestion = useCallback(() => {
    if (!currentLesson) return;
    
    console.log("nextQuestion called, current index:", currentQuestionIndex, "total:", currentLesson.exercises.length);
    
    if (currentQuestionIndex < currentLesson.exercises.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
      console.log("Moving to next question:", currentQuestionIndex + 1);
    } else {
      setIsLessonComplete(true);
      console.log("Lesson complete!");
    }
  }, [currentLesson, currentQuestionIndex]);

  const restartLesson = useCallback(() => {
    console.log("restartLesson called");
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setIsLessonComplete(false);
  }, []);

  const value = {
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
  };

  return (
    <LearningContext.Provider value={value}>
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
