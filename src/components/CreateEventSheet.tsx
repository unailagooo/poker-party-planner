import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MapPin, DollarSign, Users, Calendar } from "lucide-react";

interface CreateEventSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateEventSheet({ open, onOpenChange }: CreateEventSheetProps) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [buyIn, setBuyIn] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("9");
  const [gameType, setGameType] = useState("holdem");

  const gameTypes = [
    { id: "holdem", label: "Hold'em" },
    { id: "plo", label: "PLO" },
    { id: "tournament", label: "Torneo" },
    { id: "mixed", label: "Mixto" },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="bg-background border-border rounded-t-2xl max-h-[85vh]">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-foreground text-left">Crear Evento</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-4 pb-6">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted-foreground font-medium">Nombre del evento</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Friday Night Holdem"
              className="h-12 bg-muted border border-border rounded-xl px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted-foreground font-medium">Ubicación</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Dirección o nombre del lugar"
                className="h-12 bg-muted border border-border rounded-xl pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-full"
              />
            </div>
          </div>

          {/* Game Type */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted-foreground font-medium">Tipo de juego</label>
            <div className="flex gap-2">
              {gameTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setGameType(type.id)}
                  className={`flex-1 h-10 rounded-lg text-xs font-bold transition-all duration-200 ${
                    gameType === type.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Buy-in & Max Players */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-muted-foreground font-medium">Buy-in</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                <input
                  type="number"
                  value={buyIn}
                  onChange={(e) => setBuyIn(e.target.value)}
                  placeholder="200"
                  className="h-12 bg-muted border border-border rounded-xl pl-10 pr-4 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-muted-foreground font-medium">Jugadores máx.</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(e.target.value)}
                  className="h-12 bg-muted border border-border rounded-xl pl-10 pr-4 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-full"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            className="touch-target w-full bg-primary text-primary-foreground font-bold rounded-2xl active:scale-95 transition-all duration-200 mt-2"
            style={{ boxShadow: 'var(--emerald-glow)' }}
            onClick={() => onOpenChange(false)}
          >
            Crear Evento
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
