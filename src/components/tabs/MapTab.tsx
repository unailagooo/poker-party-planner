import { useState } from "react";
import { Plus, MapPin, Clock, Users } from "lucide-react";
import { CreateEventSheet } from "@/components/CreateEventSheet";

interface PokerEvent {
  id: string;
  name: string;
  location: string;
  buyIn: number;
  players: number;
  maxPlayers: number;
  date: string;
  distance: string;
}

const mockEvents: PokerEvent[] = [
  { id: "1", name: "Friday Night Holdem", location: "Casa de Alex", buyIn: 200, players: 6, maxPlayers: 9, date: "Hoy, 21:00", distance: "1.2 km" },
  { id: "2", name: "High Stakes PLO", location: "Club 52", buyIn: 500, players: 4, maxPlayers: 6, date: "Sáb, 20:00", distance: "3.4 km" },
  { id: "3", name: "Torneo Bounty", location: "Bar La Mesa", buyIn: 100, players: 12, maxPlayers: 16, date: "Dom, 18:00", distance: "5.1 km" },
];

export function MapTab() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="flex flex-col min-h-full">
      {/* Fake Map Background */}
      <div className="relative h-64 bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background" />
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
        {/* Map pins */}
        {mockEvents.map((event, i) => (
          <div
            key={event.id}
            className="absolute bg-primary text-primary-foreground rounded-full px-2.5 py-1 text-xs font-bold shadow-layered cursor-pointer hover:scale-110 transition-transform"
            style={{ top: `${30 + i * 25}%`, left: `${20 + i * 25}%` }}
          >
            ${event.buyIn}
          </div>
        ))}
        {/* Current location */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 rounded-full bg-primary border-2 border-primary-foreground shadow-layered" />
          <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary animate-ping opacity-30" />
        </div>
      </div>

      {/* Events List */}
      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight">Cerca de ti</h2>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-bold active:scale-95 transition-all duration-200"
            style={{ boxShadow: 'var(--emerald-glow)' }}
          >
            <Plus className="w-4 h-4" />
            Crear Evento
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {mockEvents.map((event) => (
            <div key={event.id} className="surface-card p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm">{event.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1 text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs">{event.location} · {event.distance}</span>
                  </div>
                </div>
                <span className="text-money text-lg font-bold">${event.buyIn}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {event.date}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {event.players}/{event.maxPlayers}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateEventSheet open={showCreate} onOpenChange={setShowCreate} />
    </div>
  );
}
