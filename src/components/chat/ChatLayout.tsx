import { useState } from "react";
import { MessageSquare, Users, Settings, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChatRoom } from "./ChatRoom";
import { UserList } from "./UserList";

interface Channel {
  id: string;
  name: string;
  unreadCount: number;
  isPrivate: boolean;
}

interface User {
  id: string;
  name: string;
  status: "online" | "away" | "offline";
  avatar?: string;
}

export function ChatLayout() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [showUserList, setShowUserList] = useState(true);

  const channels: Channel[] = [
    { id: "general", name: "general", unreadCount: 0, isPrivate: false },
    { id: "random", name: "random", unreadCount: 3, isPrivate: false },
    { id: "development", name: "development", unreadCount: 1, isPrivate: false },
    { id: "design", name: "design", unreadCount: 0, isPrivate: false },
  ];

  const users: User[] = [
    { id: "1", name: "Alice Johnson", status: "online" },
    { id: "2", name: "Bob Smith", status: "away" },
    { id: "3", name: "Carol Wilson", status: "online" },
    { id: "4", name: "David Brown", status: "offline" },
    { id: "5", name: "Eve Davis", status: "online" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-primary" />
            <h1 className="font-bold text-lg">WaveChat</h1>
          </div>
        </div>

        {/* Channels */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                  Channels
                </h2>
                <div className="space-y-1">
                  {channels.map((channel) => (
                    <Button
                      key={channel.id}
                      variant={activeChannel === channel.id ? "secondary" : "ghost"}
                      className="w-full justify-start h-8 px-2"
                      onClick={() => setActiveChannel(channel.id)}
                    >
                      <Hash className="w-4 h-4 mr-2" />
                      <span className="flex-1 text-left">{channel.name}</span>
                      {channel.unreadCount > 0 && (
                        <Badge variant="destructive" className="ml-auto h-5 px-1.5 text-xs">
                          {channel.unreadCount}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                  Direct Messages
                </h2>
                <div className="space-y-1">
                  {users.slice(0, 3).map((user) => (
                    <Button
                      key={user.id}
                      variant="ghost"
                      className="w-full justify-start h-8 px-2"
                    >
                      <div className="w-2 h-2 rounded-full mr-2" 
                           style={{ backgroundColor: `hsl(var(--chat-${user.status}))` }} />
                      <span className="flex-1 text-left truncate">{user.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* User Settings */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
            <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatRoom channelName={activeChannel} />
      </div>

      {/* User List */}
      {showUserList && (
        <div className="w-60 bg-card border-l border-border">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Users className="w-4 h-4" />
              Members ({users.length})
            </h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowUserList(false)}
              className="w-6 h-6 p-0"
            >
              ×
            </Button>
          </div>
          <UserList users={users} />
        </div>
      )}
    </div>
  );
}