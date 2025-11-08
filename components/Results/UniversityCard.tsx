'use client';

import React, { useState } from 'react';
import { University } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, TrendingUp, Users, DollarSign, ChevronDown, ChevronUp, Star } from 'lucide-react';

interface UniversityCardProps {
  university: University;
}

export const UniversityCard: React.FC<UniversityCardProps> = ({ university }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card hover className="relative">
      {/* Match Score Badge */}
      <div className="absolute top-4 right-4">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
          <Star className="w-4 h-4 fill-white" />
          {university.matchScore}% Match
        </div>
      </div>

      <div className="space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{university.name}</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{university.location}, {university.country}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1 text-blue-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">Rank #{university.ranking}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">{university.acceptanceRate}% Acceptance</span>
            </div>
          </div>
        </div>

        {/* Programs */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Programs Offered:</p>
          <div className="flex flex-wrap gap-2">
            {university.programs.slice(0, 3).map((program, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
              >
                {program}
              </span>
            ))}
            {university.programs.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                +{university.programs.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-600 mb-1">Annual Tuition</p>
            <p className="text-lg font-bold text-gray-900">
              {university.tuition.min === university.tuition.max
                ? formatCurrency(university.tuition.min, university.tuition.currency)
                : `${formatCurrency(university.tuition.min, university.tuition.currency)} - ${formatCurrency(university.tuition.max, university.tuition.currency)}`}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Student Body</p>
            <p className="text-lg font-bold text-gray-900">
              {university.studentBody.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Highlights */}
        {university.highlights.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Key Highlights:</p>
            <ul className="space-y-1">
              {university.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Expandable Details */}
        {isExpanded && (
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">All Programs:</p>
              <div className="flex flex-wrap gap-2">
                {university.programs.map((program, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {program}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button className="flex-1">Get Detailed Report</Button>
          <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                More
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};
