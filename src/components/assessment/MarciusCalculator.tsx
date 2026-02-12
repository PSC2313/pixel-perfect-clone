import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, Clock, DollarSign, TrendingUp, Info } from "lucide-react";

interface Props {
  onNext: (data: { salarioBruto: number; horasSemana: number; tempoDeslocamento: number; valorHoraBruta: number; valorHoraLiquida: number }) => void;
}

const HORAS_OPTIONS = [
  { label: "36h", value: 36 },
  { label: "40h", value: 40 },
  { label: "44h", value: 44 },
];

const MarciusCalculator = ({ onNext }: Props) => {
  const [salario, setSalario] = useState("");
  const [horasSemana, setHorasSemana] = useState(40);
  const [deslocamento, setDeslocamento] = useState("");
  const [customHoras, setCustomHoras] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  const horas = useCustom ? Number(customHoras) || 0 : horasSemana;
  const salarioNum = Number(salario.replace(/\D/g, "")) / 100;
  const deslocamentoNum = Number(deslocamento) || 0;

  const calc = useMemo(() => {
    if (!salarioNum || !horas) return null;
    const horasMes = horas * 4.33;
    const valorHoraBruta = salarioNum / horasMes;
    const horasDeslocamento = deslocamentoNum * 2 * 22; // ida e volta, 22 dias
    const horasTotais = horasMes + horasDeslocamento;
    const valorHoraLiquida = salarioNum / horasTotais;
    const custoOportunidade = (valorHoraBruta - valorHoraLiquida) * horasMes;
    return { valorHoraBruta, valorHoraLiquida, custoOportunidade, horasDeslocamento };
  }, [salarioNum, horas, deslocamentoNum]);

  const formatCurrency = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const handleSalarioChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    const num = Number(digits) / 100;
    setSalario(num ? num.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) : "");
  };

  const canProceed = salarioNum > 0 && horas > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <Calculator className="mx-auto mb-3 text-primary" size={32} />
        <h2 className="font-display text-xl font-bold text-foreground">Cálculo Marcius</h2>
        <p className="text-sm text-muted-foreground font-body">Descubra o valor real da sua hora de trabalho</p>
      </div>

      <div className="grid gap-4 max-w-lg mx-auto">
        <div>
          <label className="text-xs font-accent font-semibold text-muted-foreground mb-1 block">
            <DollarSign size={12} className="inline mr-1" />
            Salário Bruto Mensal
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={salario ? `R$ ${salario}` : ""}
            onChange={(e) => handleSalarioChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-sm bg-input border border-border text-foreground font-body text-sm focus:outline-none focus:border-primary/60 transition"
            placeholder="R$ 0,00"
          />
        </div>

        <div>
          <label className="text-xs font-accent font-semibold text-muted-foreground mb-1 block">
            <Clock size={12} className="inline mr-1" />
            Horas por Semana
          </label>
          <div className="flex gap-2">
            {HORAS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { setHorasSemana(opt.value); setUseCustom(false); }}
                className={`flex-1 py-2 rounded-sm border text-sm font-accent font-semibold transition ${
                  !useCustom && horasSemana === opt.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {opt.label}
              </button>
            ))}
            <input
              type="number"
              placeholder="Outro"
              value={customHoras}
              onChange={(e) => { setCustomHoras(e.target.value); setUseCustom(true); }}
              onFocus={() => setUseCustom(true)}
              className={`w-20 px-2 py-2 rounded-sm border text-sm font-body text-center transition ${
                useCustom ? "border-primary bg-primary/10 text-foreground" : "border-border bg-input text-muted-foreground"
              } focus:outline-none`}
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-accent font-semibold text-muted-foreground mb-1 block">
            <Clock size={12} className="inline mr-1" />
            Tempo de Deslocamento (horas/dia, só ida)
          </label>
          <input
            type="number"
            step="0.5"
            value={deslocamento}
            onChange={(e) => setDeslocamento(e.target.value)}
            className="w-full px-4 py-2.5 rounded-sm bg-input border border-border text-foreground font-body text-sm focus:outline-none focus:border-primary/60 transition"
            placeholder="Ex: 1.5"
          />
          <p className="text-xs text-muted-foreground mt-1 flex items-start gap-1">
            <Info size={10} className="mt-0.5 shrink-0 text-primary" />
            O tempo de transporte é multiplicado por 2 (ida+volta) × 22 dias úteis para calcular o impacto real no seu valor/hora.
          </p>
        </div>
      </div>

      {calc && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto mt-6"
        >
          <div className="hologram-panel rounded-sm p-4 text-center">
            <p className="text-xs text-muted-foreground font-accent mb-1">Valor/Hora Bruta</p>
            <p className="font-display text-lg font-bold text-primary">{formatCurrency(calc.valorHoraBruta)}</p>
          </div>
          <div className="hologram-panel rounded-sm p-4 text-center">
            <p className="text-xs text-muted-foreground font-accent mb-1">Valor/Hora Real</p>
            <p className="font-display text-lg font-bold text-accent">{formatCurrency(calc.valorHoraLiquida)}</p>
          </div>
          <div className="hologram-panel rounded-sm p-4 text-center">
            <p className="text-xs text-muted-foreground font-accent mb-1">
              <TrendingUp size={12} className="inline mr-1" />
              Custo Oportunidade
            </p>
            <p className="font-display text-lg font-bold text-destructive">{formatCurrency(calc.custoOportunidade)}/mês</p>
          </div>
        </motion.div>
      )}

      <div className="flex justify-center mt-8">
        <button
          disabled={!canProceed}
          onClick={() =>
            calc &&
            onNext({
              salarioBruto: salarioNum,
              horasSemana: horas,
              tempoDeslocamento: deslocamentoNum,
              valorHoraBruta: calc.valorHoraBruta,
              valorHoraLiquida: calc.valorHoraLiquida,
            })
          }
          className="px-8 py-3 rounded-sm bg-accent text-accent-foreground font-accent font-bold box-glow-accent hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Próxima Etapa →
        </button>
      </div>
    </motion.div>
  );
};

export default MarciusCalculator;
