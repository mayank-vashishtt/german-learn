
import React from 'react';
import { useLearning } from '../context/LearningContext';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { useNavigate } from 'react-router-dom';

const LessonComplete: React.FC = () => {
  const { currentLesson, score, restartLesson } = useLearning();
  const navigate = useNavigate();
  
  if (!currentLesson) return null;
  
  const totalQuestions = currentLesson.exercises.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message = '';
  if (percentage === 100) {
    message = 'Perfect! Amazing job!';
  } else if (percentage >= 80) {
    message = 'Great work! You\'re making excellent progress!';
  } else if (percentage >= 60) {
    message = 'Good job! Keep practicing to improve.';
  } else {
    message = 'Keep practicing! You\'ll improve with time.';
  }

  return (
    <Card className="w-full max-w-xl mx-auto animate-bounce-in">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Lesson Complete!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-xl mb-2">Your Score</p>
          <div className="text-4xl font-bold text-germlearn-purple">{score} / {totalQuestions}</div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-3 bg-germlearn-grey" />
        </div>
        
        <div className="bg-germlearn-light-green p-4 rounded-lg text-center">
          <p className="font-medium">{message}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-3 flex-wrap">
        <Button 
          onClick={restartLesson}
          className="bg-germlearn-purple hover:bg-germlearn-purple/90"
        >
          Retry Lesson
        </Button>
        <Button 
          onClick={() => navigate('/lessons')}
          variant="outline"
          className="border-germlearn-purple text-germlearn-purple hover:bg-germlearn-light-purple"
        >
          Back to Lessons
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LessonComplete;
