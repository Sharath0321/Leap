import { University } from '@/types';

export const mockUniversities: University[] = [
  {
    id: '1',
    name: 'Massachusetts Institute of Technology',
    location: 'Cambridge, MA',
    country: 'USA',
    ranking: 1,
    matchScore: 95,
    programs: ['Computer Science', 'Engineering', 'Business'],
    tuition: { min: 53790, max: 53790, currency: 'USD' },
    acceptanceRate: 7,
    studentBody: 11520,
    highlights: ['World #1 Ranking', 'Strong CS Program', 'Innovation Hub'],
  },
  {
    id: '2',
    name: 'Stanford University',
    location: 'Stanford, CA',
    country: 'USA',
    ranking: 3,
    matchScore: 92,
    programs: ['Computer Science', 'Engineering', 'Business', 'Medicine'],
    tuition: { min: 56169, max: 56169, currency: 'USD' },
    acceptanceRate: 4,
    studentBody: 17249,
    highlights: ['Silicon Valley Location', 'Top Engineering', 'Research Excellence'],
  },
  {
    id: '3',
    name: 'University of Cambridge',
    location: 'Cambridge',
    country: 'UK',
    ranking: 2,
    matchScore: 88,
    programs: ['Engineering', 'Computer Science', 'Natural Sciences'],
    tuition: { min: 33000, max: 58000, currency: 'GBP' },
    acceptanceRate: 21,
    studentBody: 24390,
    highlights: ['Historic Institution', 'Research Leader', 'Global Recognition'],
  },
  {
    id: '4',
    name: 'ETH Zurich',
    location: 'Zurich',
    country: 'Switzerland',
    ranking: 7,
    matchScore: 85,
    programs: ['Engineering', 'Computer Science', 'Mathematics'],
    tuition: { min: 730, max: 730, currency: 'CHF' },
    acceptanceRate: 27,
    studentBody: 22000,
    highlights: ['Low Tuition', 'Tech Excellence', 'European Location'],
  },
  {
    id: '5',
    name: 'University of Toronto',
    location: 'Toronto, ON',
    country: 'Canada',
    ranking: 21,
    matchScore: 82,
    programs: ['Computer Science', 'Engineering', 'Business', 'Medicine'],
    tuition: { min: 45000, max: 58000, currency: 'CAD' },
    acceptanceRate: 43,
    studentBody: 95055,
    highlights: ['Diverse Community', 'Strong Programs', 'Canada Location'],
  },
  {
    id: '6',
    name: 'University of Melbourne',
    location: 'Melbourne',
    country: 'Australia',
    ranking: 14,
    matchScore: 80,
    programs: ['Engineering', 'Business', 'Medicine', 'Arts'],
    tuition: { min: 41000, max: 55000, currency: 'AUD' },
    acceptanceRate: 70,
    studentBody: 52000,
    highlights: ['Australia #1', 'Quality Education', 'Beautiful Campus'],
  },
  {
    id: '7',
    name: 'National University of Singapore',
    location: 'Singapore',
    country: 'Singapore',
    ranking: 8,
    matchScore: 78,
    programs: ['Engineering', 'Computer Science', 'Business'],
    tuition: { min: 38000, max: 50000, currency: 'SGD' },
    acceptanceRate: 25,
    studentBody: 38000,
    highlights: ['Asia Top Rank', 'Modern Facilities', 'International Hub'],
  },
  {
    id: '8',
    name: 'Technical University of Munich',
    location: 'Munich',
    country: 'Germany',
    ranking: 37,
    matchScore: 75,
    programs: ['Engineering', 'Computer Science', 'Natural Sciences'],
    tuition: { min: 0, max: 2000, currency: 'EUR' },
    acceptanceRate: 8,
    studentBody: 42000,
    highlights: ['Low/No Tuition', 'Engineering Excellence', 'Germany Location'],
  },
];

export const getFilteredUniversities = (
  universities: University[],
  filters: {
    country?: string;
    minRanking?: number;
    maxBudget?: number;
  }
): University[] => {
  return universities.filter((uni) => {
    if (filters.country && uni.country !== filters.country) return false;
    if (filters.minRanking && uni.ranking > filters.minRanking) return false;
    if (filters.maxBudget && uni.tuition.max > filters.maxBudget) return false;
    return true;
  });
};
