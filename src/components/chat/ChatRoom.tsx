import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Smile, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  type: "text" | "file" | "image";
  reactions?: { emoji: string; count: number; users: string[] }[];
}

interface ChatRoomProps {
  channelName: string;
}

export function ChatRoom({ channelName }: ChatRoomProps) {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Mock messages
  const messages: Message[] = [
    {
      id: "1",
      content: "Hey everyone! Welcome to the chat room. How's everyone doing today?",
      sender: { id: "1", name: "Alice Johnson" },
      timestamp: new Date(Date.now() - 3600000),
      type: "text",
      reactions: [{ emoji: "👋", count: 3, users: ["2", "3", "4"] }]
    },
    {
      id: "2",
      content: "I'm doing great! Just finished working on the new chat interface. What do you think?",
      sender: { id: "current", name: "You" },
      timestamp: new Date(Date.now() - 3000000),
      type: "text",
    },
    {
      id: "3",
      content: "Looks amazing! The design is really clean and modern. Great work! 🎉",
      sender: { id: "2", name: "Bob Smith" },
      timestamp: new Date(Date.now() - 2400000),
      type: "text",
      reactions: [{ emoji: "🎉", count: 2, users: ["1", "current"] }]
    },
    {
      id: "4",
      content: "I love the real-time features. The typing indicators work perfectly!",
      sender: { id: "3", name: "Carol Wilson" },
      timestamp: new Date(Date.now() - 1800000),
      type: "text",
    },
    {
      id: "5",
      content: "Can we add some emoji reactions to messages? That would be awesome! 😊",
      sender: { id: "4", name: "David Brown" },
      timestamp: new Date(Date.now() - 900000),
      type: "text",
    }
  ];

  const [typingUsers] = useState(["Alice Johnson"]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message via Socket.io or Supabase
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-semibold">#</span>
            </div>
            <div>
              <h2 className="font-semibold text-lg">#{channelName}</h2>
              <p className="text-sm text-muted-foreground">
                {messages.length} messages • 5 members
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg, index) => {
            const isCurrentUser = msg.sender.id === "current";
            const showAvatar = index === 0 || messages[index - 1].sender.id !== msg.sender.id;
            
            return (
              <MessageBubble
                key={msg.id}
                message={msg}
                isCurrentUser={isCurrentUser}
                showAvatar={showAvatar}
              />
            );
          })}
          
          {typingUsers.length > 0 && (
            <TypingIndicator users={typingUsers} />
          )}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-end gap-2">
          <Button variant="ghost" size="sm" className="mb-1">
            <Paperclip className="w-4 h-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message #${channelName}`}
              className="pr-20 resize-none"
              maxLength={2000}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Smile className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <Button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            size="sm"
            className="mb-1"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground mt-2">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}