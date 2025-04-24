
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex-1">
      <div className="bg-germlearn-light-purple py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8 mx-auto w-16 h-16 bg-germlearn-purple rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">G</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-germlearn-dark animate-slide-up">Welcome to GermanLearn</h1>
          <p className="text-xl max-w-lg mx-auto mb-8 text-germlearn-dark/80 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Learn German through interactive lessons with vocabulary and quizzes
          </p>
          <Button asChild size="lg" className="bg-germlearn-green hover:bg-germlearn-green/90 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <Link to="/lessons">Start Learning</Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-germlearn-light-green rounded-full mb-4 flex items-center justify-center">
              <span className="text-germlearn-green text-xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Learn Vocabulary</h3>
            <p className="text-gray-600">Start with basic German vocabulary in easy-to-digest lessons.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-germlearn-light-purple rounded-full mb-4 flex items-center justify-center">
              <span className="text-germlearn-purple text-xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Practice with Quizzes</h3>
            <p className="text-gray-600">Reinforce your learning with interactive multiple-choice exercises.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-germlearn-light-green rounded-full mb-4 flex items-center justify-center">
              <span className="text-germlearn-green text-xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Track Progress</h3>
            <p className="text-gray-600">See your scores and monitor your improvement over time.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-germlearn-light-green py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Learn German?</h2>
          <Button asChild size="lg" className="bg-germlearn-purple hover:bg-germlearn-purple/90">
            <Link to="/lessons">Browse Lessons</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
