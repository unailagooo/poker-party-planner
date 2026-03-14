import { Settings, ChevronRight, Trophy, TrendingUp, Clock, CreditCard } from "lucide-react";
import { PlayerAvatar } from "@/components/PlayerAvatar";

const stats = [
  { label: "Sesiones", value: "47", icon: Clock },
  { label: "Ganancia Neta", value: "+$2,340", icon: TrendingUp },
  { label: "Mejor Sesión", value: "+$890", icon: Trophy },
  { label: "Buy-ins Total", value: "$9,400", icon: CreditCard },
];

const menuItems = [
  { label: "Historial de Sesiones", chevron: true },
  { label: "Amigos", chevron: true },
  { label: "Métodos de Pago", chevron: true },
  { label: "Notificaciones", chevron: true },
  { label: "Configuración", chevron: true },
];

export function ProfileTab() {
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Header */}
      <header className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold tracking-tighter">Perfil</h1>
        <button className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </header>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <PlayerAvatar name="Jugador Demo" id="demo-user-profile" size="lg" />
        <div>
          <h2 className="text-lg font-bold">Jugador Demo</h2>
          <p className="text-sm text-muted-foreground">@demo_shark</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="surface-card p-4 flex flex-col gap-2">
            <stat.icon className="w-4 h-4 text-muted-foreground" />
            <span className="text-xl font-bold font-mono tracking-tight">{stat.value}</span>
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="surface-card divide-y divide-border overflow-hidden">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
          >
            <span className="text-sm font-medium">{item.label}</span>
            {item.chevron && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          </button>
        ))}
      </div>
    </div>
  );
}
