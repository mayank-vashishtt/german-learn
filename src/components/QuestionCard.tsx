import React, { useEffect, useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const QuestionCard: React.FC = () => {
  const { 
    currentLesson, 
    currentQuestionIndex, 
    selectedAnswer, 
    isAnswerChecked,
    selectAnswer,
    checkAnswer,
    nextQuestion
  } = useLearning();
  
  const [localSelectedAnswer, setLocalSelectedAnswer] = useState<string | null>(null);

  // Sync local state with context state
  useEffect(() => {
    setLocalSelectedAnswer(selectedAnswer);
  }, [selectedAnswer]);

  // Debug logs
  useEffect(() => {
    console.log("QuestionCard rendering with:", { 
      selectedAnswer, 
      localSelectedAnswer,
      isAnswerChecked,
      hasCurrentLesson: !!currentLesson,
      currentQuestionIndex
    });
  }, [selectedAnswer, localSelectedAnswer, isAnswerChecked, currentLesson, currentQuestionIndex]);

  if (!currentLesson) return null;

  const exercise = currentLesson.exercises[currentQuestionIndex];
  const isCorrect = selectedAnswer === exercise.answer;

  const getOptionClassName = (option: string) => {
    if (!isAnswerChecked) {
      return selectedAnswer === option 
        ? "border-germlearn-purple bg-germlearn-light-purple" 
        : "border-gray-200 hover:border-germlearn-purple hover:bg-germlearn-light-purple/30";
    }
    
    if (option === exercise.answer) {
      return "border-germlearn-green bg-germlearn-light-green";
    }
    
    if (selectedAnswer === option && !isCorrect) {
      return "border-germlearn-red bg-red-100";
    }
    
    return "border-gray-200 opacity-50";
  };

  const handleOptionClick = (option: string) => {
    console.log("Option clicked:", option);
    selectAnswer(option);
    setLocalSelectedAnswer(option);
  };

  const handleCheckAnswer = () => {
    console.log("Check answer button clicked, selectedAnswer:", selectedAnswer, "localSelectedAnswer:", localSelectedAnswer);
    if (!selectedAnswer && localSelectedAnswer) {
      // If context doesn't have the answer but we do locally, update context first
      selectAnswer(localSelectedAnswer);
      setTimeout(() => checkAnswer(), 50); // Small delay to ensure state is updated
    } else {
      checkAnswer();
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto animate-bounce-in">
      <CardHeader>
        <CardTitle className="text-center">Question {currentQuestionIndex + 1}</CardTitle>
        <CardDescription className="text-center">
          {currentQuestionIndex + 1} of {currentLesson.exercises.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 className="text-xl font-medium text-center">{exercise.question}</h3>
        
        <div className="space-y-3">
          {exercise.options.map((option, idx) => (
            <button
              key={idx}
              disabled={isAnswerChecked}
              onClick={() => handleOptionClick(option)}
              className={cn(
                "w-full p-4 border-2 rounded-lg transition-all flex items-center justify-between",
                getOptionClassName(option)
              )}
            >
              <span>{option}</span>
              {isAnswerChecked && option === exercise.answer && (
                <Check className="text-germlearn-green" />
              )}
              {isAnswerChecked && selectedAnswer === option && !isCorrect && (
                <X className="text-germlearn-red" />
              )}
            </button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        {!isAnswerChecked ? (
          <Button 
            onClick={handleCheckAnswer} 
            disabled={!selectedAnswer && !localSelectedAnswer}
            className="bg-germlearn-purple hover:bg-germlearn-purple/90 w-full max-w-xs"
          >
            Check Answer
          </Button>
        ) : (
          <Button 
            onClick={nextQuestion}
            className="bg-germlearn-green hover:bg-germlearn-green/90 w-full max-w-xs"
          >
            {currentQuestionIndex < currentLesson.exercises.length - 1 ? "Next Question" : "Show Results"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
