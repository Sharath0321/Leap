'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChatInterface } from '@/components/Agent/ChatInterface';
import { Message, UserProfile, Question } from '@/types';
import { questions, getNextQuestion, updateProfile } from '@/lib/profileAgent';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EvaluatePage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [profile, setProfile] = useState<UserProfile>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Initialize with first question
    if (currentQuestionIndex === 0 && messages.length === 0) {
      const firstQuestion = questions[0];
      setCurrentQuestion(firstQuestion);
      addAgentMessage(firstQuestion.text);
    }
  }, []);

  const addAgentMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type: 'agent',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: Array.isArray(content) ? content.join(', ') : content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const handleAnswer = async (answer: string | string[]) => {
    if (isProcessing || !currentQuestion) return;

    setIsProcessing(true);
    
    // Add user message
    addUserMessage(answer);

    // Update profile
    const updatedProfile = updateProfile(profile, currentQuestion, answer);
    setProfile(updatedProfile);

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Move to next question
    const nextIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIndex);

    if (nextIndex < questions.length) {
      const nextQuestion = getNextQuestion(nextIndex, updatedProfile);
      if (nextQuestion) {
        setCurrentQuestion(nextQuestion);
        addAgentMessage(nextQuestion.text);
      }
    } else {
      // Evaluation complete
      setIsComplete(true);
      addAgentMessage(
        "Excellent! I've gathered all the information I need. Let me analyze your profile and find the best university matches for you..."
      );
      
      // Redirect to results after a delay
      setTimeout(() => {
        router.push('/results');
      }, 2000);
    }

    setIsProcessing(false);
  };

  const progress = ((currentQuestionIndex + (isComplete ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold gradient-text">
              LeapScholar
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ minHeight: '600px' }}>
          <div className="h-full flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <h1 className="text-2xl font-bold mb-2">AI Profile Evaluation</h1>
              <p className="text-blue-100">
                Answer a few questions to get personalized university recommendations
              </p>
            </div>

            <div className="flex-1 overflow-hidden">
              <ChatInterface
                messages={messages}
                currentQuestion={currentQuestion}
                progress={progress}
                onAnswer={handleAnswer}
                isProcessing={isProcessing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
