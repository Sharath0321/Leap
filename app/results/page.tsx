'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { UniversityCard } from '@/components/Results/UniversityCard';
import { ResultsHeader } from '@/components/Results/ResultsHeader';
import { Filters } from '@/components/Results/Filters';
import { Button } from '@/components/ui/Button';
import { mockUniversities, getFilteredUniversities } from '@/lib/mockData';
import { ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

export default function ResultsPage() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<string>('match');

  const countries = useMemo(() => {
    const countrySet = new Set(mockUniversities.map((u) => u.country));
    return Array.from(countrySet).sort();
  }, []);

  const filteredUniversities = useMemo(() => {
    let filtered = getFilteredUniversities(mockUniversities, {
      country: selectedCountry,
    });

    // Sort universities
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.matchScore - a.matchScore;
        case 'ranking':
          return a.ranking - b.ranking;
        case 'tuition-low':
          return a.tuition.min - b.tuition.min;
        case 'tuition-high':
          return b.tuition.max - a.tuition.max;
        default:
          return b.matchScore - a.matchScore;
      }
    });

    return filtered;
  }, [selectedCountry, sortBy]);

  const handleExport = () => {
    // In a real app, this would export the results to PDF/CSV
    alert('Export functionality would be implemented here');
  };

  const handleShare = () => {
    // In a real app, this would share the results
    if (navigator.share) {
      navigator.share({
        title: 'My University Matches - LeapScholar',
        text: `I found ${filteredUniversities.length} perfect university matches!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleSchedule = () => {
    // In a real app, this would open a scheduling modal
    alert('Schedule consultation functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold gradient-text">
              LeapScholar
            </Link>
            <div className="flex gap-3">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/evaluate">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ResultsHeader
          matchCount={filteredUniversities.length}
          onExport={handleExport}
          onShare={handleShare}
          onSchedule={handleSchedule}
        />

        <Filters
          countries={countries}
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <div className="space-y-6">
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((university) => (
              <UniversityCard key={university.id} university={university} />
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <p className="text-xl text-gray-600 mb-4">
                No universities found matching your filters.
              </p>
              <Button onClick={() => setSelectedCountry(undefined)}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Want More Detailed Insights?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get a comprehensive report with application deadlines, scholarship opportunities, 
            visa requirements, and personalized recommendations from our expert counselors.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" onClick={handleSchedule}>
              Schedule Free Consultation
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white/20">
              Download Full Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
