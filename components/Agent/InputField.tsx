"use client";

import React, { useState, useEffect } from "react";
import { Question } from "@/types";
import { Button } from "@/components/ui/Button";
import { Send, ChevronRight } from "lucide-react";

interface InputFieldProps {
  question: any;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  isProcessing: boolean;
  onAnswer?: (answer: string | string[]) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  question,
  value,
  onChange,
  onSubmit,
  isProcessing,
  onAnswer,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Reset selected options when question changes
  useEffect(() => {
    setSelectedOptions([]);
  }, [question.id]);

  const handleOptionClick = (option: string) => {
    if (isProcessing) return; // Prevent clicks during processing
    
    if (question.type === "multi-select") {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    } else {
      // Update value immediately for instant visual feedback
      onChange(option);
      
      // Submit immediately - no delay for instant response
      if (onAnswer) {
        // Use setTimeout with 0ms to ensure state update happens first, but feels instant
        setTimeout(() => {
          onAnswer(option);
        }, 0);
      } else {
        // Create a synthetic event for form submission
        const syntheticEvent = {
          preventDefault: () => {},
        } as React.FormEvent;
        onSubmit(syntheticEvent);
      }
    }
  };

  const handleMultiSelectSubmit = () => {
    if (selectedOptions.length > 0) {
      const answerString = selectedOptions.join(", ");
      onChange(answerString);
      if (onAnswer) {
        onAnswer(selectedOptions);
      } else {
        onSubmit();
      }
      setSelectedOptions([]);
    }
  };

  if (question.type === "multiple-choice" || question.type === "dropdown") {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question.options?.map((option: string) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              disabled={isProcessing}
              className={`p-4 text-left rounded-xl border-2 transition-all duration-150 active:scale-95 ${
                value === option
                  ? "border-blue-600 bg-blue-50 text-blue-900"
                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
              } ${
                isProcessing
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {value === option && (
                  <ChevronRight className="w-5 h-5 text-blue-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === "multi-select") {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question.options?.map((option: string) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              disabled={isProcessing}
              className={`p-4 text-left rounded-xl border-2 transition-all duration-150 active:scale-95 ${
                selectedOptions.includes(option)
                  ? "border-blue-600 bg-blue-50 text-blue-900"
                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
              } ${
                isProcessing
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {selectedOptions.includes(option) && (
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
        {selectedOptions.length > 0 && (
          <Button
            onClick={handleMultiSelectSubmit}
            disabled={isProcessing}
            className="w-full"
          >
            Continue with {selectedOptions.length} selected
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer..."
        disabled={isProcessing}
        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 disabled:opacity-50"
      />
      <Button type="submit" disabled={isProcessing || !value.trim()}>
        <Send className="w-5 h-5" />
      </Button>
    </form>
  );
};
