import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAssessment } from "@/lib/context";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  "Is multi-factor authentication enabled for business email accounts?",
  "Are company devices encrypted?",
  "Are regular backups performed?",
  "Are backups tested periodically?",
  "Are systems and software patched on a schedule?",
  "Do employees use unique user accounts instead of shared logins?",
  "Are administrative privileges restricted to only those who need them?",
  "Is endpoint protection or antivirus installed on business devices?",
  "Is there a documented incident response process?",
  "Do employees receive phishing or security awareness training?",
  "Is sensitive customer or business data stored securely?",
  "Are third-party vendors reviewed before being given access to sensitive data?"
];

export default function Assessment() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setAnswer } = useAssessment();
  const [, setLocation] = useLocation();

  const handleAnswer = (value: boolean) => {
    setAnswer(currentIndex, value);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setLocation("/results");
    }
  };

  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <header className="py-6 px-8 border-b bg-card">
        <div className="max-w-3xl mx-auto w-full">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-sm text-muted-foreground" data-testid="text-question-counter">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}% Completed
            </span>
          </div>
          <Progress value={progress} className="h-2" data-testid="progress-bar" />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl p-8 md:p-12 shadow-sm border"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-10 leading-tight" data-testid={`text-question-${currentIndex}`}>
                {questions[currentIndex]}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-16 text-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleAnswer(true)}
                  data-testid="button-answer-yes"
                >
                  Yes
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 text-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleAnswer(false)}
                  data-testid="button-answer-no"
                >
                  No
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
