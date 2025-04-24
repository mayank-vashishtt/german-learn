
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLearning } from '@/context/LearningContext';
import { lessons } from '@/data/lessons';
import VocabList from '@/components/VocabList';
import QuestionCard from '@/components/QuestionCard';
import LessonComplete from '@/components/LessonComplete';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

enum LessonState {
  VOCAB,
  QUIZ,
  COMPLETE
}

const LessonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    setCurrentLesson, 
    currentLesson, 
    isLessonComplete, 
    restartLesson 
  } = useLearning();
  const [activeTab, setActiveTab] = useState<string>('vocabulary');
  const [lessonState, setLessonState] = useState<LessonState>(LessonState.VOCAB);
  
  useEffect(() => {
    if (!id) return;
    
    const lesson = lessons.find(l => l.id === id);
    if (lesson) {
      setCurrentLesson(lesson);
      restartLesson();
    } else {
      navigate('/lessons');
    }
  }, [id, setCurrentLesson, navigate, restartLesson]);
  
  useEffect(() => {
    if (isLessonComplete) {
      setLessonState(LessonState.COMPLETE);
    }
  }, [isLessonComplete]);
  
  if (!currentLesson) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  
  return (
    <div className="flex-1 container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/lessons" className="text-germlearn-purple hover:underline mb-2 inline-block">
          ← Back to Lessons
        </Link>
        <h1 className="text-3xl font-bold">{currentLesson.title}</h1>
        <p className="text-gray-600">{currentLesson.description}</p>
      </div>
      
      {lessonState === LessonState.VOCAB && (
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
              <TabsTrigger value="about">About this Lesson</TabsTrigger>
            </TabsList>
            <TabsContent value="vocabulary" className="mt-4">
              <VocabList vocabulary={currentLesson.vocabulary} />
            </TabsContent>
            <TabsContent value="about" className="mt-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-2">About this Lesson</h3>
                <p className="mb-4">{currentLesson.description}</p>
                <p className="mb-2">In this lesson you will learn:</p>
                <ul className="list-disc pl-5 mb-4">
                  <li>Basic German vocabulary for {currentLesson.title.toLowerCase()}</li>
                  <li>Proper pronunciation guidelines</li>
                  <li>Common usage scenarios</li>
                </ul>
                <p className="text-sm text-gray-600">This lesson contains {currentLesson.exercises.length} practice questions.</p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-center">
            <Button 
              onClick={() => setLessonState(LessonState.QUIZ)}
              className="bg-germlearn-green hover:bg-germlearn-green/90"
              size="lg"
            >
              Start Practice
            </Button>
          </div>
        </div>
      )}
      
      {lessonState === LessonState.QUIZ && <QuestionCard />}
      
      {lessonState === LessonState.COMPLETE && <LessonComplete />}
    </div>
  );
};

export default LessonDetails;
