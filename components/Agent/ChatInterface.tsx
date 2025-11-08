"use client";

import React, { useState, useEffect, useRef } from "react";
import { Message } from "@/types";
import { MessageBubble } from "./MessageBubble";
import { InputField } from "./InputField";
import { ProgressBar } from "./ProgressBar";

interface ChatInterfaceProps {
  messages: Message[];
  currentQuestion: any;
  progress: number;
  onAnswer: (answer: string | string[]) => void;
  isProcessing: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  currentQuestion,
  progress,
  onAnswer,
  isProcessing,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit: (e?: React.FormEvent<Element>) => void = (e) => {
    e?.preventDefault();
    if (inputValue.trim() && !isProcessing) {
      onAnswer(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <ProgressBar progress={progress} />

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isProcessing && (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="flex gap-1">
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
            <span className="text-sm">AI is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {currentQuestion && (
        <div className="border-t border-gray-200 bg-white p-4">
          <InputField
            question={currentQuestion}
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSubmit}
            isProcessing={isProcessing}
            onAnswer={onAnswer}
          />
        </div>
      )}
    </div>
  );
};
