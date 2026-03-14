import { useState } from "react";
import { Map, Calculator, MessageCircle, User } from "lucide-react";
import { MapTab } from "@/components/tabs/MapTab";
import { CalculatorTab } from "@/components/tabs/CalculatorTab";
import { SocialTab } from "@/components/tabs/SocialTab";
import { ProfileTab } from "@/components/tabs/ProfileTab";

type TabId = "map" | "calculator" | "social" | "profile";

const tabs: { id: TabId; label: string; icon: typeof Map }[] = [
  { id: "map", label: "Mapa", icon: Map },
  { id: "calculator", label: "Mesa", icon: Calculator },
  { id: "social", label: "Social", icon: MessageCircle },
  { id: "profile", label: "Perfil", icon: User },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("map");

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto relative">
      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === "map" && <MapTab />}
        {activeTab === "calculator" && <CalculatorTab />}
        {activeTab === "social" && <SocialTab />}
        {activeTab === "profile" && <ProfileTab />}
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card/90 backdrop-blur-xl border-t border-border z-50">
        <div className="flex items-center justify-around h-16 px-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
        {/* Safe area for mobile */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );
};

export default Index;
