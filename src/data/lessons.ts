
export interface VocabItem {
  de: string;
  en: string;
}

export interface Exercise {
  question: string;
  options: string[];
  answer: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  vocabulary: VocabItem[];
  exercises: Exercise[];
}

export const lessons: Lesson[] = [
  {
    id: "greetings",
    title: "Greetings",
    description: "Learn basic German greetings and introductions",
    vocabulary: [
      { de: "Hallo", en: "Hello" },
      { de: "Guten Morgen", en: "Good morning" },
      { de: "Tschüss", en: "Bye" },
      { de: "Auf Wiedersehen", en: "Goodbye" },
      { de: "Wie geht's?", en: "How are you?" }
    ],
    exercises: [
      {
        question: "What does 'Hallo' mean?",
        options: ["Bye", "Hello", "Good night"],
        answer: "Hello"
      },
      {
        question: "What is 'Good morning' in German?",
        options: ["Guten Morgen", "Gute Nacht", "Guten Tag"],
        answer: "Guten Morgen"
      },
      {
        question: "How would you say 'Goodbye' in German?",
        options: ["Hallo", "Tschüss", "Auf Wiedersehen"],
        answer: "Auf Wiedersehen"
      },
      {
        question: "What does 'Wie geht's?' mean?",
        options: ["What's your name?", "How are you?", "Where are you from?"],
        answer: "How are you?"
      },
      {
        question: "Which word means 'Bye' in German?",
        options: ["Tschüss", "Guten Tag", "Danke"],
        answer: "Tschüss"
      }
    ]
  },
  {
    id: "basics",
    title: "Basic Phrases",
    description: "Essential phrases for everyday conversations",
    vocabulary: [
      { de: "Danke", en: "Thank you" },
      { de: "Bitte", en: "Please/You're welcome" },
      { de: "Ja", en: "Yes" },
      { de: "Nein", en: "No" },
      { de: "Entschuldigung", en: "Excuse me/Sorry" }
    ],
    exercises: [
      {
        question: "What does 'Danke' mean?",
        options: ["Hello", "Thank you", "Goodbye"],
        answer: "Thank you"
      },
      {
        question: "Which German word can mean both 'Please' and 'You're welcome'?",
        options: ["Danke", "Bitte", "Ja"],
        answer: "Bitte"
      },
      {
        question: "What is 'Yes' in German?",
        options: ["Nein", "Ja", "Bitte"],
        answer: "Ja"
      },
      {
        question: "How do you say 'No' in German?",
        options: ["Nein", "Ja", "Danke"],
        answer: "Nein"
      },
      {
        question: "What does 'Entschuldigung' mean?",
        options: ["Excuse me/Sorry", "Thank you", "You're welcome"],
        answer: "Excuse me/Sorry"
      }
    ]
  }
];
