export interface UserProfile {
  academicBackground?: {
    degree?: string;
    field?: string;
    gpa?: string;
  };
  preferredCountries?: string[];
  budget?: string;
  programLevel?: string;
  careerGoals?: string;
  universityPreferences?: {
    ranking?: string;
    size?: string;
    location?: string;
  };
  timeline?: string;
  additionalPreferences?: string;
}

export interface Message {
  id: string;
  type: 'agent' | 'user';
  content: string;
  timestamp: Date;
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'multiple-choice' | 'dropdown' | 'multi-select';
  options?: string[];
  required?: boolean;
  field: keyof UserProfile | string;
}

export interface University {
  id: string;
  name: string;
  location: string;
  country: string;
  ranking: number;
  matchScore: number;
  programs: string[];
  tuition: {
    min: number;
    max: number;
    currency: string;
  };
  acceptanceRate: number;
  studentBody: number;
  highlights: string[];
  logo?: string;
}
