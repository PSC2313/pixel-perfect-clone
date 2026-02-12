import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

const QUESTIONS = [
  { q: "Em um projeto de equipe, você prefere:", options: [
    { text: "Tomar as decisões e liderar", type: "D" },
    { text: "Motivar e conectar as pessoas", type: "I" },
    { text: "Garantir que todos estejam confortáveis", type: "S" },
    { text: "Planejar cada detalhe cuidadosamente", type: "C" },
  ]},
  { q: "Quando enfrenta um problema, você:", options: [
    { text: "Age rápido e busca resultados", type: "D" },
    { text: "Conversa com outros para encontrar soluções", type: "I" },
    { text: "Analisa calmamente antes de agir", type: "S" },
    { text: "Pesquisa dados e fatos detalhados", type: "C" },
  ]},
  { q: "No ambiente de trabalho, você valoriza mais:", options: [
    { text: "Desafios e competição", type: "D" },
    { text: "Reconhecimento e interação social", type: "I" },
    { text: "Estabilidade e harmonia", type: "S" },
    { text: "Precisão e qualidade", type: "C" },
  ]},
  { q: "Sob pressão, você tende a:", options: [
    { text: "Ser direto e exigente", type: "D" },
    { text: "Ficar otimista e falar mais", type: "I" },
    { text: "Buscar consenso e evitar conflitos", type: "S" },
    { text: "Se retrair e analisar mais", type: "C" },
  ]},
  { q: "Você se motiva mais por:", options: [
    { text: "Poder e autoridade", type: "D" },
    { text: "Popularidade e diversão", type: "I" },
    { text: "Segurança e lealdade", type: "S" },
    { text: "Conhecimento e perfeição", type: "C" },
  ]},
  { q: "Seu estilo de comunicação é:", options: [
    { text: "Direto e objetivo", type: "D" },
    { text: "Entusiasta e persuasivo", type: "I" },
    { text: "Calmo e empático", type: "S" },
    { text: "Detalhista e lógico", type: "C" },
  ]},
  { q: "Ao aprender algo novo, você:", options: [
    { text: "Quer aplicar imediatamente", type: "D" },
    { text: "Prefere aprender em grupo", type: "I" },
    { text: "Gosta de ir no seu próprio ritmo", type: "S" },
    { text: "Estuda a fundo antes de praticar", type: "C" },
  ]},
  { q: "O que mais te incomoda é:", options: [
    { text: "Perder tempo e lentidão", type: "D" },
    { text: "Ser ignorado ou rejeitado", type: "I" },
    { text: "Mudanças bruscas e conflitos", type: "S" },
    { text: "Erros e falta de padrão", type: "C" },
  ]},
  { q: "Numa reunião, você geralmente:", options: [
    { text: "Vai direto ao ponto", type: "D" },
    { text: "Anima e engaja as pessoas", type: "I" },
    { text: "Ouve mais do que fala", type: "S" },
    { text: "Faz perguntas detalhadas", type: "C" },
  ]},
  { q: "Seu maior ponto forte é:", options: [
    { text: "Determinação e foco em resultados", type: "D" },
    { text: "Criatividade e carisma", type: "I" },
    { text: "Paciência e confiabilidade", type: "S" },
    { text: "Análise e atenção aos detalhes", type: "C" },
  ]},
  { q: "Você prefere trabalhar:", options: [
    { text: "De forma independente, no comando", type: "D" },
    { text: "Em equipes dinâmicas e criativas", type: "I" },
    { text: "Em ambientes previsíveis e cooperativos", type: "S" },
    { text: "Com processos claros e documentados", type: "C" },
  ]},
  { q: "Quando recebe feedback negativo, você:", options: [
    { text: "Quer saber como melhorar já", type: "D" },
    { text: "Fica chateado mas supera rápido", type: "I" },
    { text: "Leva para o lado pessoal", type: "S" },
    { text: "Analisa se o feedback é justo", type: "C" },
  ]},
];

interface Props {
  onComplete: (profile: "D" | "I" | "S" | "C", scores: { D: number; I: number; S: number; C: number }) => void;
  onBack: () => void;
}

const DiscTest = ({ onComplete, onBack }: Props) => {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({ D: 0, I: 0, S: 0, C: 0 });

  const handleAnswer = (type: string) => {
    const newScores = { ...scores, [type]: scores[type as keyof typeof scores] + 1 };
    setScores(newScores);

    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      const dominant = (Object.entries(newScores) as [keyof typeof newScores, number][])
        .sort((a, b) => b[1] - a[1])[0][0];
      onComplete(dominant as "D" | "I" | "S" | "C", newScores);
    }
  };

  const question = QUESTIONS[current];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6 max-w-lg mx-auto"
    >
      <div className="text-center mb-4">
        <Zap className="mx-auto mb-3 text-accent" size={32} />
        <h2 className="font-display text-xl font-bold text-foreground">Perfil DISC</h2>
        <p className="text-sm text-muted-foreground font-body">Descubra seu perfil comportamental</p>
      </div>

      {/* Mini progress */}
      <div className="flex gap-1 max-w-xs mx-auto">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < current ? "bg-primary" : i === current ? "bg-accent" : "bg-secondary"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3 }}
          className="hologram-panel rounded-sm p-6"
        >
          <p className="text-xs text-muted-foreground font-accent mb-3">
            Pergunta {current + 1} de {QUESTIONS.length}
          </p>
          <p className="font-body text-foreground font-medium mb-5">{question.q}</p>

          <div className="grid gap-2">
            {question.options.map((opt, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => handleAnswer(opt.type)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-left px-4 py-3 rounded-sm border border-border bg-card text-sm font-body text-foreground hover:border-primary/60 hover:bg-primary/5 transition"
              >
                {opt.text}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {current === 0 && (
        <div className="flex justify-center">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-sm border border-border text-muted-foreground font-accent font-semibold hover:border-primary/40 hover:text-primary transition"
          >
            ← Voltar
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default DiscTest;
