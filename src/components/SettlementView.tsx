import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import type { Player } from "@/components/tabs/CalculatorTab";

interface SettlementViewProps {
  players: Player[];
  onBack: () => void;
  onSetFinalStack: (id: string, value: number) => void;
}

interface Payment {
  from: string;
  to: string;
  amount: number;
}

function calculatePayments(players: Player[]): Payment[] {
  const balances = players.map(p => ({
    name: p.name,
    balance: (p.finalStack ?? 0) - (p.buyIns * p.buyInAmount),
  }));

  const debtors = balances.filter(b => b.balance < 0).map(b => ({ ...b, balance: Math.abs(b.balance) }));
  const creditors = balances.filter(b => b.balance > 0).map(b => ({ ...b }));

  debtors.sort((a, b) => b.balance - a.balance);
  creditors.sort((a, b) => b.balance - a.balance);

  const payments: Payment[] = [];
  let i = 0, j = 0;

  while (i < debtors.length && j < creditors.length) {
    const amount = Math.min(debtors[i].balance, creditors[j].balance);
    if (amount > 0) {
      payments.push({ from: debtors[i].name, to: creditors[j].name, amount });
    }
    debtors[i].balance -= amount;
    creditors[j].balance -= amount;
    if (debtors[i].balance === 0) i++;
    if (creditors[j].balance === 0) j++;
  }

  return payments;
}

export function SettlementView({ players, onBack, onSetFinalStack }: SettlementViewProps) {
  const [showResults, setShowResults] = useState(false);
  const [stacks, setStacks] = useState<Record<string, string>>(
    Object.fromEntries(players.map(p => [p.id, p.finalStack?.toString() ?? ""]))
  );

  const allFilled = players.every(p => stacks[p.id] !== "" && !isNaN(Number(stacks[p.id])));

  const handleCalculate = () => {
    players.forEach(p => {
      onSetFinalStack(p.id, Number(stacks[p.id]) || 0);
    });
    setShowResults(true);
  };

  const updatedPlayers = players.map(p => ({
    ...p,
    finalStack: Number(stacks[p.id]) || 0,
  }));

  const payments = showResults ? calculatePayments(updatedPlayers) : [];
  const totalIn = players.reduce((sum, p) => sum + p.buyIns * p.buyInAmount, 0);
  const totalOut = updatedPlayers.reduce((sum, p) => sum + (p.finalStack ?? 0), 0);

  return (
    <div className="flex flex-col gap-4 p-4">
      <header className="flex items-center gap-3 py-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl font-bold tracking-tighter">
            {showResults ? "Pagos" : "Final Stack"}
          </h1>
          <p className="text-xs text-muted-foreground">Pot Total: <span className="text-money">${totalIn.toLocaleString()}</span></p>
        </div>
      </header>

      {!showResults ? (
        <>
          <p className="text-sm text-muted-foreground">Introduce el stack final de cada jugador.</p>

          <div className="flex flex-col gap-2">
            {players.map((player) => (
              <div key={player.id} className="surface-card p-4 flex items-center gap-3">
                <PlayerAvatar name={player.name} id={player.id} />
                <div className="flex-1">
                  <p className="font-medium text-sm">{player.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    In: ${(player.buyIns * player.buyInAmount).toLocaleString()}
                  </p>
                </div>
                <div className="relative w-28">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary text-sm font-mono">$</span>
                  <input
                    type="number"
                    value={stacks[player.id]}
                    onChange={(e) => setStacks({ ...stacks, [player.id]: e.target.value })}
                    placeholder="0"
                    className="w-full h-11 bg-muted border border-border rounded-lg pl-7 pr-3 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-right"
                  />
                </div>
              </div>
            ))}
          </div>

          {totalOut > 0 && totalOut !== totalIn && (
            <p className="text-xs text-accent font-medium text-center">
              ⚠ Los stacks suman ${totalOut.toLocaleString()} pero el pot es ${totalIn.toLocaleString()}
            </p>
          )}

          <button
            onClick={handleCalculate}
            disabled={!allFilled}
            className="touch-target w-full bg-primary text-primary-foreground font-bold rounded-2xl active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:active:scale-100 flex items-center justify-center gap-2"
            style={{ boxShadow: allFilled ? 'var(--emerald-glow)' : 'none' }}
          >
            Calcular Pagos
            <ArrowRight className="w-4 h-4" />
          </button>
        </>
      ) : (
        <>
          {/* Results */}
          <div className="flex flex-col gap-3">
            {payments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Check className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-sm">Todos están a mano 🎉</p>
              </div>
            ) : (
              payments.map((payment, i) => (
                <div key={i} className="surface-card p-4 flex items-center gap-3 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="font-medium text-sm">{payment.from}</span>
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-medium text-sm">{payment.to}</span>
                  </div>
                  <span className="text-money text-lg font-bold">${payment.amount.toLocaleString()}</span>
                </div>
              ))
            )}
          </div>

          <button
            onClick={onBack}
            className="touch-target w-full bg-muted text-foreground font-bold rounded-2xl active:scale-95 transition-all duration-200 mt-2"
          >
            Volver a la Mesa
          </button>
        </>
      )}
    </div>
  );
}
