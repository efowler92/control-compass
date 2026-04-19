import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <header className="py-6 px-8 border-b bg-card">
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
            <ShieldCheck size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight">Control Compass</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-accent"></span>
            A simple cybersecurity readiness check
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary mb-6" data-testid="heading-title">
            Know your security posture in 3 minutes.
          </h1>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed" data-testid="text-description">
            Control Compass is designed for small business leaders. Answer 12 simple questions to get a clear, professional assessment of your current security risks—no technical jargon, just actionable clarity.
          </p>
          
          <Link href="/assessment" className="inline-flex">
            <Button size="lg" className="h-14 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all" data-testid="button-start">
              Start Assessment
            </Button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
