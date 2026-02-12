import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatePresence } from "framer-motion";
import ProgressBar from "@/components/assessment/ProgressBar";
import MarciusCalculator from "@/components/assessment/MarciusCalculator";
import AreaSelector from "@/components/assessment/AreaSelector";
import DiscTest from "@/components/assessment/DiscTest";

const STEPS = ["Valor da Hora", "Áreas", "Perfil DISC"];

const AssessmentPage = () => {
  const [step, setStep] = useState(0);
  const { updateAssessment } = useAuth();
  const navigate = useNavigate();

  const handleMarcius = (data: {
    salarioBruto: number;
    horasSemana: number;
    tempoDeslocamento: number;
    valorHoraBruta: number;
    valorHoraLiquida: number;
  }) => {
    updateAssessment(data);
    setStep(1);
  };

  const handleAreas = (areas: string[]) => {
    updateAssessment({ areasInteresse: areas });
    setStep(2);
  };

  const handleDisc = (profile: "D" | "I" | "S" | "C", scores: { D: number; I: number; S: number; C: number }) => {
    updateAssessment({ discProfile: profile, discScores: scores, completed: true });
    navigate("/resultado");
  };

  return (
    <div className="min-h-screen gradient-hero scanline px-4 pt-24 pb-12">
      <ProgressBar currentStep={step} totalSteps={STEPS.length} labels={STEPS} />

      <AnimatePresence mode="wait">
        {step === 0 && <MarciusCalculator key="marcius" onNext={handleMarcius} />}
        {step === 1 && <AreaSelector key="areas" onNext={handleAreas} onBack={() => setStep(0)} />}
        {step === 2 && <DiscTest key="disc" onComplete={handleDisc} onBack={() => setStep(1)} />}
      </AnimatePresence>
    </div>
  );
};

export default AssessmentPage;
