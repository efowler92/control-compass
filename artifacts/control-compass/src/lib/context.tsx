import React, { createContext, useContext, useState } from 'react';

type Answers = Record<number, boolean>;

interface AssessmentContextType {
  answers: Answers;
  setAnswer: (index: number, value: boolean) => void;
  reset: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<Answers>({});

  const setAnswer = (index: number, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const reset = () => setAnswers({});

  return (
    <AssessmentContext.Provider value={{ answers, setAnswer, reset }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
