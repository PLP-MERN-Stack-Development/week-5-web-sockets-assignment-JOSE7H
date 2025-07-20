import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface User {
  id: string;
  name: string;
  status: "online" | "away" | "offline";
  avatar?: string;
}

interface UserListProps {
  users: User[];
}

export function UserList({ users }: UserListProps) {
  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "online":
        return "bg-chat-online";
      case "away":
        return "bg-chat-away";
      case "offline":
        return "bg-chat-offline";
      default:
        return "bg-muted";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const groupedUsers = users.reduce((acc, user) => {
    if (!acc[user.status]) {
      acc[user.status] = [];
    }
    acc[user.status].push(user);
    return acc;
  }, {} as Record<string, User[]>);

  const statusOrder: User["status"][] = ["online", "away", "offline"];

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        {statusOrder.map((status) => {
          const statusUsers = groupedUsers[status] || [];
          if (statusUsers.length === 0) return null;

          return (
            <div key={status}>
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {status} — {statusUsers.length}
                </h4>
              </div>
              
              <div className="space-y-1">
                {statusUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer group"
                  >
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(
                          user.status
                        )}`}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {user.name}
                      </p>
                      {status === "away" && (
                        <p className="text-xs text-muted-foreground">Away</p>
                      )}
                    </div>
                    
                    {user.id === "1" && (
                      <Badge variant="secondary" className="text-xs">
                        Admin
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}