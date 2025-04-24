
import React from 'react';
import { VocabItem } from '../data/lessons';
import { Card, CardContent } from './ui/card';

interface VocabListProps {
  vocabulary: VocabItem[];
}

const VocabList: React.FC<VocabListProps> = ({ vocabulary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {vocabulary.map((vocab, index) => (
        <Card key={index} className="bg-germlearn-light-purple animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
          <CardContent className="p-4 flex flex-col items-center">
            <p className="font-bold text-lg">{vocab.de}</p>
            <p className="text-sm text-gray-600">{vocab.en}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VocabList;
