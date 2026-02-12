import { motion } from "framer-motion";

interface Props {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

const ProgressBar = ({ currentStep, totalSteps, labels }: Props) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between mb-2">
        {labels.map((label, i) => (
          <span
            key={i}
            className={`text-xs font-accent font-semibold transition-colors ${
              i <= currentStep ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="relative h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, hsl(155 60% 35%), hsl(155 60% 50%))",
            boxShadow: "0 0 12px hsl(155 60% 45% / 0.4)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <p className="text-center text-xs text-muted-foreground font-body mt-2">
        Etapa {currentStep + 1} de {totalSteps}
      </p>
    </div>
  );
};

export default ProgressBar;
