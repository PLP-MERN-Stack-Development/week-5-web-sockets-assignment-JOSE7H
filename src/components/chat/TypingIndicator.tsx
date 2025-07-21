import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TypingIndicatorProps {
  users: string[];
}

export function TypingIndicator({ users }: TypingIndicatorProps) {
  if (users.length === 0) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getTypingText = () => {
    if (users.length === 1) {
      return `${users[0]} is typing...`;
    } else if (users.length === 2) {
      return `${users[0]} and ${users[1]} are typing...`;
    } else {
      return `${users[0]} and ${users.length - 1} others are typing...`;
    }
  };

  return (
    <div className="flex gap-3 items-center">
      <Avatar className="w-10 h-10">
        <AvatarFallback className="bg-muted text-muted-foreground text-sm">
          {getInitials(users[0])}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex items-center gap-2 bg-muted rounded-2xl px-4 py-2">
        <span className="text-sm text-muted-foreground">{getTypingText()}</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}