
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-germlearn-purple rounded-full w-10 h-10 flex items-center justify-center">
            <span className="text-white font-bold text-xl">G</span>
          </div>
          <h1 className="text-xl font-bold text-germlearn-dark">GermanLearn</h1>
        </Link>
        <div className="flex gap-2">
          <Button asChild variant="ghost">
            <Link to="/">Home</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/lessons">Lessons</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
