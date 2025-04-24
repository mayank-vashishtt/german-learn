
import React from 'react';
import { lessons } from '../data/lessons';
import LessonCard from '../components/LessonCard';

const Lessons = () => {
  return (
    <div className="flex-1 container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Available Lessons</h1>
      <p className="text-gray-600 mb-6">Select a lesson to start learning German</p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

export default Lessons;
