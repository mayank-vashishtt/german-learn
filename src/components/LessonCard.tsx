
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Lesson } from '../data/lessons';
import { Link } from 'react-router-dom';

interface LessonCardProps {
  lesson: Lesson;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="bg-germlearn-light-purple rounded-t-lg">
        <CardTitle>{lesson.title}</CardTitle>
        <CardDescription>{lesson.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Vocabulary:</p>
          <div className="grid grid-cols-2 gap-2">
            {lesson.vocabulary.slice(0, 2).map((vocab, index) => (
              <div key={index} className="bg-germlearn-light-green p-2 rounded-md">
                <p className="font-medium">{vocab.de}</p>
                <p className="text-xs text-gray-600">{vocab.en}</p>
              </div>
            ))}
            {lesson.vocabulary.length > 2 && (
              <div className="bg-germlearn-grey p-2 rounded-md text-center">
                <p className="text-xs">+ {lesson.vocabulary.length - 2} more</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button asChild className="bg-germlearn-green hover:bg-germlearn-green/90">
          <Link to={`/lesson/${lesson.id}`}>Start Lesson</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LessonCard;
