import { MessageCircle, Users, Search } from "lucide-react";
import { PlayerAvatar } from "@/components/PlayerAvatar";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  isGroup: boolean;
}

const mockChats: Chat[] = [
  { id: "1", name: "Friday Night Crew", lastMessage: "Alex: ¿Confirmamos para las 21?", time: "14:32", unread: 3, isGroup: true },
  { id: "2", name: "Carlos M.", lastMessage: "Me debes $50 del otro día", time: "12:15", unread: 1, isGroup: false },
  { id: "3", name: "Torneo Mensual", lastMessage: "Nuevo torneo el sábado!", time: "Ayer", unread: 0, isGroup: true },
  { id: "4", name: "María López", lastMessage: "Buena mano 🔥", time: "Ayer", unread: 0, isGroup: false },
  { id: "5", name: "High Stakes PLO", lastMessage: "¿Subimos los stakes?", time: "Mar", unread: 0, isGroup: true },
];

export function SocialTab() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <header className="py-4">
        <h1 className="text-2xl font-bold tracking-tighter">Mensajes</h1>
      </header>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          placeholder="Buscar conversaciones..."
          className="w-full h-11 bg-muted border border-border rounded-xl pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <button className="flex items-center gap-1.5 px-3 py-2 bg-primary/10 text-primary rounded-lg text-xs font-bold">
          <MessageCircle className="w-3 h-3" />
          Todos
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 bg-muted text-muted-foreground rounded-lg text-xs font-medium hover:text-foreground transition-colors">
          <Users className="w-3 h-3" />
          Grupos
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 bg-muted text-muted-foreground rounded-lg text-xs font-medium hover:text-foreground transition-colors">
          Privados
        </button>
      </div>

      {/* Chat List */}
      <div className="flex flex-col">
        {mockChats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center gap-3 p-3 -mx-1 rounded-xl hover:bg-muted/50 cursor-pointer active:scale-[0.98] transition-all"
          >
            <div className="relative">
              <PlayerAvatar name={chat.name} id={chat.id} />
              {chat.isGroup && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                  <Users className="w-2.5 h-2.5 text-foreground" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm truncate">{chat.name}</p>
                <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{chat.time}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{chat.lastMessage}</p>
            </div>

            {chat.unread > 0 && (
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-primary-foreground">{chat.unread}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
