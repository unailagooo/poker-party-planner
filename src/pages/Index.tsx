import { useState, Suspense } from "react";
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

import { Scene } from "@/components/3d/Scene";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("map");

  return (
    <>
      <Suspense fallback={<div className="fixed inset-0 bg-black -z-10 pointer-events-none" />}>
        <Scene />
      </Suspense>
      <div className="flex flex-col min-h-screen max-w-md mx-auto relative bg-transparent pointer-events-none">
        {/* Content - re-enable pointer events for the interactive layer */}
        <main className="flex-1 overflow-y-auto pb-20 pointer-events-auto">
          {activeTab === "map" && <MapTab />}
        {activeTab === "calculator" && <CalculatorTab />}
        {activeTab === "social" && <SocialTab />}
        {activeTab === "profile" && <ProfileTab />}
        </main>

        {/* Bottom Tab Bar */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/5 dark:bg-black/20 backdrop-blur-[40px] border-t border-white/10 z-50 pointer-events-auto shadow-[0_-8px_32px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-around h-16 px-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] scale-110"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-2"}`} />
                  <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
                </button>
              );
            })}
          </div>
          {/* Safe area for mobile */}
          <div className="h-[env(safe-area-inset-bottom)]" />
        </nav>
      </div>
    </>
  );
};

export default Index;
