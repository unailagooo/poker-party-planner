import { useState } from "react";
import { Plus, Minus, ArrowRight, Check } from "lucide-react";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { SettlementView } from "@/components/SettlementView";

export interface Player {
  id: string;
  name: string;
  buyIns: number;
  buyInAmount: number;
  finalStack?: number;
}

export function CalculatorTab() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [sessionBuyIn, setSessionBuyIn] = useState(200);
  const [isSettling, setIsSettling] = useState(false);

  const addPlayer = () => {
    if (!newPlayerName.trim()) return;
    setPlayers([...players, {
      id: crypto.randomUUID(),
      name: newPlayerName.trim(),
      buyIns: 1,
      buyInAmount: sessionBuyIn,
    }]);
    setNewPlayerName("");
  };

  const addRebuy = (id: string) => {
    setPlayers(players.map(p =>
      p.id === id ? { ...p, buyIns: p.buyIns + 1 } : p
    ));
  };

  const removeRebuy = (id: string) => {
    setPlayers(players.map(p =>
      p.id === id && p.buyIns > 1 ? { ...p, buyIns: p.buyIns - 1 } : p
    ));
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const setFinalStack = (id: string, value: number) => {
    setPlayers(players.map(p =>
      p.id === id ? { ...p, finalStack: value } : p
    ));
  };

  const totalPot = players.reduce((sum, p) => sum + p.buyIns * p.buyInAmount, 0);
  const totalRebuys = players.reduce((sum, p) => sum + (p.buyIns - 1), 0);

  if (isSettling) {
    return (
      <SettlementView
        players={players}
        onBack={() => setIsSettling(false)}
        onSetFinalStack={setFinalStack}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Header */}
      <header className="flex justify-between items-end py-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter">Live Session</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{players.length} jugadores · {totalRebuys} rebuys</p>
        </div>
        <span className="text-money text-2xl font-bold">${totalPot.toLocaleString()}</span>
      </header>

      {/* Buy-in Config */}
      <div className="surface-card p-4">
        <label className="text-xs text-muted-foreground font-medium">Buy-in de la sesión</label>
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => setSessionBuyIn(Math.max(10, sessionBuyIn - 50))}
            className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-money text-xl font-bold flex-1 text-center">${sessionBuyIn}</span>
          <button
            onClick={() => setSessionBuyIn(sessionBuyIn + 50)}
            className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add Player */}
      <div className="flex gap-2">
        <input
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addPlayer()}
          placeholder="Nombre del jugador"
          className="flex-1 h-12 bg-muted border border-border rounded-xl px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button
          onClick={addPlayer}
          className="h-12 w-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center active:scale-95 transition-transform"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Player List */}
      <div className="flex flex-col gap-2">
        {players.map((player) => (
          <div
            key={player.id}
            className="surface-card p-4 flex items-center justify-between animate-slide-up"
          >
            <div className="flex items-center gap-3">
              <PlayerAvatar name={player.name} id={player.id} />
              <div>
                <p className="font-medium text-sm">{player.name}</p>
                <p className="text-xs text-muted-foreground font-mono">
                  In: ${(player.buyIns * player.buyInAmount).toLocaleString()}
                  {player.buyIns > 1 && (
                    <span className="text-debt ml-1">({player.buyIns - 1} rebuy{player.buyIns > 2 ? 's' : ''})</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => removeRebuy(player.id)}
                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                onClick={() => addRebuy(player.id)}
                className="px-3 py-2 bg-secondary hover:bg-surface-hover rounded-lg text-xs font-bold transition-colors"
              >
                + REBUY
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {players.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">Añade jugadores para comenzar la sesión</p>
        </div>
      )}

      {/* Settle Button */}
      {players.length >= 2 && (
        <button
          onClick={() => setIsSettling(true)}
          className="touch-target w-full bg-primary text-primary-foreground font-bold rounded-2xl active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 mt-2"
          style={{ boxShadow: 'var(--emerald-glow)' }}
        >
          Cerrar Sesión
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
