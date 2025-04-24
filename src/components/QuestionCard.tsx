
import React from 'react';
import { useLearning } from '../context/LearningContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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
              onClick={() => selectAnswer(option)}
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
            onClick={checkAnswer} 
            disabled={!selectedAnswer}
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
