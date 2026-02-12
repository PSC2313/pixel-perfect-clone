import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code, Brain, BarChart3, Palette, Shield, Megaphone,
  Blocks, Cloud, GitBranch, Target, Check
} from "lucide-react";

const AREAS = [
  { id: "dev", label: "Desenvolvimento", icon: Code, demanda: "Alta", salario: "R$ 8-25k" },
  { id: "ia", label: "Inteligência Artificial", icon: Brain, demanda: "Muito Alta", salario: "R$ 12-35k" },
  { id: "data", label: "Data Science", icon: BarChart3, demanda: "Alta", salario: "R$ 10-28k" },
  { id: "ux", label: "UX/UI Design", icon: Palette, demanda: "Média-Alta", salario: "R$ 6-18k" },
  { id: "cyber", label: "Cibersegurança", icon: Shield, demanda: "Muito Alta", salario: "R$ 10-30k" },
  { id: "marketing", label: "Marketing Digital", icon: Megaphone, demanda: "Alta", salario: "R$ 5-15k" },
  { id: "blockchain", label: "Blockchain", icon: Blocks, demanda: "Média", salario: "R$ 10-25k" },
  { id: "cloud", label: "Cloud Computing", icon: Cloud, demanda: "Alta", salario: "R$ 9-22k" },
  { id: "devops", label: "DevOps", icon: GitBranch, demanda: "Alta", salario: "R$ 10-25k" },
  { id: "product", label: "Product Management", icon: Target, demanda: "Média-Alta", salario: "R$ 8-20k" },
];

const MAX_SELECT = 5;

interface Props {
  onNext: (areas: string[]) => void;
  onBack: () => void;
}

const AreaSelector = ({ onNext, onBack }: Props) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : prev.length < MAX_SELECT ? [...prev, id] : prev
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <Target className="mx-auto mb-3 text-primary" size={32} />
        <h2 className="font-display text-xl font-bold text-foreground">Áreas de Interesse</h2>
        <p className="text-sm text-muted-foreground font-body">
          Selecione até {MAX_SELECT} áreas que te interessam
        </p>
        <p className="text-xs text-primary font-accent mt-1">{selected.length}/{MAX_SELECT} selecionadas</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-3xl mx-auto">
        {AREAS.map((area, i) => {
          const Icon = area.icon;
          const isSelected = selected.includes(area.id);
          return (
            <motion.button
              key={area.id}
              type="button"
              onClick={() => toggle(area.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`relative p-4 rounded-sm border text-center transition-all ${
                isSelected
                  ? "border-primary bg-primary/10 box-glow"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check size={12} className="text-primary-foreground" />
                </motion.div>
              )}
              <Icon size={24} className={`mx-auto mb-2 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
              <p className={`text-xs font-accent font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>
                {area.label}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">Demanda: {area.demanda}</p>
              <p className="text-[10px] text-accent font-semibold">{area.salario}</p>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-sm border border-border text-muted-foreground font-accent font-semibold hover:border-primary/40 hover:text-primary transition"
        >
          ← Voltar
        </button>
        <button
          disabled={selected.length === 0}
          onClick={() => onNext(selected)}
          className="px-8 py-3 rounded-sm bg-accent text-accent-foreground font-accent font-bold box-glow-accent hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Próxima Etapa →
        </button>
      </div>
    </motion.div>
  );
};

export default AreaSelector;
