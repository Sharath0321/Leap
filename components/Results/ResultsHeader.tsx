'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Download, Share2, Calendar } from 'lucide-react';

interface ResultsHeaderProps {
  matchCount: number;
  onExport?: () => void;
  onShare?: () => void;
  onSchedule?: () => void;
}

export const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  matchCount,
  onExport,
  onShare,
  onSchedule,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your University Matches
          </h1>
          <p className="text-gray-600">
            We found <span className="font-semibold text-blue-600">{matchCount} perfect matches</span> based on your profile
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={onSchedule}>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Consultation
          </Button>
          <Button variant="outline" onClick={onShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" onClick={onExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};
