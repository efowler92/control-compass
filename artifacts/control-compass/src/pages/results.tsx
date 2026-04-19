import { useAssessment } from "@/lib/context";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ShieldCheck, Printer, RotateCcw, AlertTriangle, Info } from "lucide-react";
import { motion } from "framer-motion";

const questionsData = [
  { text: "Is multi-factor authentication enabled for business email accounts?", weight: 15, rec: "Enable multi-factor authentication for all business email and admin accounts", domain: "Access Control" },
  { text: "Are company devices encrypted?", weight: 10, rec: "Turn on device encryption for all laptops and mobile devices", domain: "Data Protection" },
  { text: "Are regular backups performed?", weight: 15, rec: "Create and test regular data backups to ensure they can be restored", domain: "Resilience" },
  { text: "Are backups tested periodically?", weight: 8, rec: "Create and test regular data backups to ensure they can be restored", domain: "Resilience" },
  { text: "Are systems and software patched on a schedule?", weight: 10, rec: "Establish a recurring patch schedule for all systems and applications", domain: "Operational Security" },
  { text: "Do employees use unique user accounts instead of shared logins?", weight: 8, rec: "Eliminate shared logins — assign each user a unique account", domain: "Access Control" },
  { text: "Are administrative privileges restricted to only those who need them?", weight: 10, rec: "Limit administrator privileges to only essential personnel", domain: "Access Control" },
  { text: "Is endpoint protection or antivirus installed on business devices?", weight: 8, rec: "Install and maintain endpoint protection on all business devices", domain: "Operational Security" },
  { text: "Is there a documented incident response process?", weight: 8, rec: "Create a basic incident response checklist for cyber events", domain: "Resilience" },
  { text: "Do employees receive phishing or security awareness training?", weight: 4, rec: "Provide phishing and security awareness training to all employees", domain: "Operational Security" },
  { text: "Is sensitive customer or business data stored securely?", weight: 8, rec: "Store sensitive customer and business data securely with access controls", domain: "Data Protection" },
  { text: "Are third-party vendors reviewed before being given access to sensitive data?", weight: 6, rec: "Review all vendors before granting access to sensitive systems or data", domain: "Third-Party Risk" }
];

const domains = [
  { name: "Access Control", max: 33, indices: [0, 5, 6] },
  { name: "Data Protection", max: 18, indices: [1, 10] },
  { name: "Resilience", max: 31, indices: [2, 3, 8] },
  { name: "Operational Security", max: 22, indices: [4, 7, 9] },
  { name: "Third-Party Risk", max: 6, indices: [11] }
];

export default function Results() {
  const { answers, reset } = useAssessment();
  const [, setLocation] = useLocation();

  // If accessed directly without answers, go to home
  if (Object.keys(answers).length === 0) {
    setLocation("/");
    return null;
  }

  let totalScore = 0;
  const missingControls: { rec: string; weight: number }[] = [];

  questionsData.forEach((q, index) => {
    if (answers[index]) {
      totalScore += q.weight;
    } else {
      missingControls.push({ rec: q.rec, weight: q.weight });
    }
  });

  // Deduplicate and sort
  const uniqueMissing = Array.from(new Map(missingControls.map(item => [item.rec, item])).values());
  uniqueMissing.sort((a, b) => b.weight - a.weight);
  const topPriority = uniqueMissing.slice(0, 5);

  let riskLevel = "High Risk";
  let riskColor = "text-destructive";
  let riskBg = "bg-destructive/10";
  let explanation = "Your organization is highly vulnerable to common cyber threats. Immediate action is required to implement baseline security controls and protect your business.";

  if (totalScore >= 80) {
    riskLevel = "Low Risk";
    riskColor = "text-emerald-600";
    riskBg = "bg-emerald-50";
    explanation = "Your organization has strong baseline security controls in place. Continue monitoring and maintaining these practices to ensure ongoing protection.";
  } else if (totalScore >= 60) {
    riskLevel = "Moderate Risk";
    riskColor = "text-amber-600";
    riskBg = "bg-amber-50";
    explanation = "Your organization has some essential controls, but critical gaps exist. Prioritize addressing the missing controls to reduce your risk exposure.";
  }

  const handleStartOver = () => {
    reset();
    setLocation("/");
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      <header className="py-6 px-8 border-b bg-card no-print">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
              <ShieldCheck size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight">Control Compass</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.print()} data-testid="button-print">
              <Printer className="w-4 h-4 mr-2" /> Print Summary
            </Button>
            <Button onClick={handleStartOver} data-testid="button-start-over">
              <RotateCcw className="w-4 h-4 mr-2" /> Start Over
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-8 space-y-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-card p-8 rounded-2xl border shadow-sm print-break-inside-avoid"
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div className="relative w-48 h-48 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" className="text-muted opacity-20" />
                <motion.circle 
                  cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" 
                  className={riskColor}
                  strokeDasharray="283" 
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * totalScore) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-primary" data-testid="text-score">{totalScore}</span>
                <span className="text-sm font-medium text-muted-foreground mt-1">/ 100</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-4">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg ${riskColor} ${riskBg}`} data-testid="badge-risk-level">
              <AlertTriangle size={20} />
              {riskLevel}
            </div>
            <h2 className="text-2xl font-bold text-primary">Assessment Complete</h2>
            <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-score-explanation">
              {explanation}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-primary border-b pb-4">Domain Scores</h3>
            <div className="space-y-4">
              {domains.map(domain => {
                const domainScore = domain.indices.reduce((sum, idx) => sum + (answers[idx] ? questionsData[idx].weight : 0), 0);
                const percent = (domainScore / domain.max) * 100;
                return (
                  <Card key={domain.name} className="print-break-inside-avoid">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-primary" data-testid={`text-domain-${domain.name.toLowerCase().replace(/\s+/g, '-')}`}>{domain.name}</span>
                        <span className="text-sm font-bold text-muted-foreground">{domainScore}/{domain.max}</span>
                      </div>
                      <Progress value={percent} className="h-2" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-primary border-b pb-4">Top Priority Actions</h3>
            {topPriority.length === 0 ? (
              <Card className="bg-emerald-50 border-emerald-100 print-break-inside-avoid">
                <CardContent className="p-8 text-center text-emerald-800">
                  <ShieldCheck className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="font-medium text-lg">Outstanding work.</p>
                  <p className="mt-2 text-emerald-700/80">You have implemented all baseline security controls.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {topPriority.map((item, idx) => (
                  <Card key={idx} className="border-l-4 border-l-destructive print-break-inside-avoid">
                    <CardContent className="p-5 flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center font-bold shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-medium text-primary leading-tight" data-testid={`text-rec-${idx}`}>
                          {item.rec}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </motion.section>
        </div>

        <footer className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground flex items-center justify-center gap-2 print-break-inside-avoid">
          <Info size={16} />
          <span>This tool provides educational guidance only and does not constitute legal, regulatory, or compliance advice.</span>
        </footer>
      </main>
    </div>
  );
}
