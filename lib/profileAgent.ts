import { Question, UserProfile } from '@/types';

export const questions: Question[] = [
  {
    id: '1',
    text: "Hello! I'm here to help you find the perfect university match. Let's start with your academic background. What's your current or highest degree?",
    type: 'multiple-choice',
    options: ['High School', "Bachelor's", "Master's", 'PhD'],
    required: true,
    field: 'academicBackground',
  },
  {
    id: '2',
    text: 'What field of study are you interested in?',
    type: 'multiple-choice',
    options: [
      'Computer Science',
      'Engineering',
      'Business',
      'Medicine',
      'Natural Sciences',
      'Arts & Humanities',
      'Social Sciences',
      'Other',
    ],
    required: true,
    field: 'academicBackground',
  },
  {
    id: '3',
    text: 'What program level are you looking for?',
    type: 'multiple-choice',
    options: ["Bachelor's", "Master's", 'PhD', 'Certificate/Diploma'],
    required: true,
    field: 'programLevel',
  },
  {
    id: '4',
    text: 'Which countries or regions are you interested in studying? (You can select multiple)',
    type: 'multi-select',
    options: ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Switzerland', 'Singapore', 'Other'],
    required: true,
    field: 'preferredCountries',
  },
  {
    id: '5',
    text: 'What is your approximate annual budget for tuition?',
    type: 'multiple-choice',
    options: [
      'Under $10,000',
      '$10,000 - $30,000',
      '$30,000 - $50,000',
      '$50,000 - $70,000',
      'Over $70,000',
      'Budget is flexible',
    ],
    required: true,
    field: 'budget',
  },
  {
    id: '6',
    text: 'What are your career goals after graduation?',
    type: 'multiple-choice',
    options: [
      'Research & Academia',
      'Industry/Corporate',
      'Entrepreneurship',
      'Government/Public Sector',
      'Still Exploring',
    ],
    required: true,
    field: 'careerGoals',
  },
  {
    id: '7',
    text: 'What matters most to you in a university?',
    type: 'multiple-choice',
    options: [
      'World Ranking & Prestige',
      'Program Quality',
      'Affordability',
      'Location & Culture',
      'Research Opportunities',
      'Career Services',
    ],
    required: true,
    field: 'universityPreferences',
  },
  {
    id: '8',
    text: 'When are you planning to start your studies?',
    type: 'multiple-choice',
    options: [
      'Within 6 months',
      '6-12 months',
      '1-2 years',
      '2+ years',
      'Just exploring',
    ],
    required: true,
    field: 'timeline',
  },
];

export const getNextQuestion = (currentIndex: number, profile: UserProfile): Question | null => {
  if (currentIndex >= questions.length) return null;
  return questions[currentIndex];
};

export const updateProfile = (
  profile: UserProfile,
  question: Question,
  answer: string | string[]
): UserProfile => {
  const updated = { ...profile };

  if (question.field === 'academicBackground') {
    updated.academicBackground = {
      ...updated.academicBackground,
      [question.id === '1' ? 'degree' : 'field']: answer as string,
    };
  } else if (question.field === 'preferredCountries') {
    updated.preferredCountries = answer as string[];
  } else if (question.field === 'universityPreferences') {
    updated.universityPreferences = {
      ...updated.universityPreferences,
      ranking: answer as string,
    };
  } else {
    (updated as any)[question.field] = answer;
  }

  return updated;
};
