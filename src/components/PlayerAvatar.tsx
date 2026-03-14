interface PlayerAvatarProps {
  name: string;
  id: string;
  size?: "sm" | "md" | "lg";
}

// Generate a unique gradient based on the player's ID
function getGradient(id: string): string {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue1 = hash % 360;
  const hue2 = (hue1 + 60 + (hash % 120)) % 360;
  return `linear-gradient(135deg, oklch(0.7 0.15 ${hue1}), oklch(0.6 0.2 ${hue2}))`;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-lg",
};

export function PlayerAvatar({ name, id, size = "md" }: PlayerAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold text-foreground shrink-0`}
      style={{ background: getGradient(id) }}
    >
      {initials}
    </div>
  );
}
