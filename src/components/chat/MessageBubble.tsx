import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

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

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  showAvatar: boolean;
}

export function MessageBubble({ message, isCurrentUser, showAvatar }: MessageBubbleProps) {
  const [showReactions, setShowReactions] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleReaction = (emoji: string) => {
    // In a real app, this would send the reaction via Socket.io or Supabase
    console.log("Adding reaction:", emoji, "to message:", message.id);
  };

  const quickReactions = ["👍", "❤️", "😊", "😂", "😮", "😢"];

  return (
    <div className={`flex gap-3 group ${isCurrentUser ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        {showAvatar && !isCurrentUser && (
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary/10 text-primary text-sm">
              {getInitials(message.sender.name)}
            </AvatarFallback>
          </Avatar>
        )}
        {!showAvatar && !isCurrentUser && <div className="w-10" />}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[70%] ${isCurrentUser ? "items-end" : ""}`}>
        {/* Sender name and timestamp */}
        {showAvatar && (
          <div className={`flex items-center gap-2 mb-1 ${isCurrentUser ? "flex-row-reverse" : ""}`}>
            <span className="text-sm font-semibold">{message.sender.name}</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(message.timestamp, { addSuffix: true })}
            </span>
          </div>
        )}

        {/* Message bubble */}
        <div
          className={`relative rounded-2xl px-4 py-2 break-words ${
            isCurrentUser
              ? "bg-chat-bubble-sent text-chat-bubble-sent-foreground ml-auto"
              : "bg-chat-bubble-received text-chat-bubble-received-foreground border border-border"
          }`}
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>

          {/* Quick reactions on hover */}
          {showReactions && (
            <div className={`absolute -top-8 flex items-center gap-1 bg-popover border border-border rounded-full px-2 py-1 shadow-lg ${
              isCurrentUser ? "right-0" : "left-0"
            }`}>
              {quickReactions.map((emoji) => (
                <Button
                  key={emoji}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-muted"
                  onClick={() => handleReaction(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Existing reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className={`flex flex-wrap gap-1 mt-1 ${isCurrentUser ? "justify-end" : ""}`}>
            {message.reactions.map((reaction, index) => (
              <Button
                key={index}
                variant="secondary"
                size="sm"
                className="h-6 px-2 text-xs rounded-full"
                onClick={() => handleReaction(reaction.emoji)}
              >
                {reaction.emoji} {reaction.count}
              </Button>
            ))}
          </div>
        )}

        {/* Timestamp for non-avatar messages */}
        {!showAvatar && (
          <div className={`text-xs text-muted-foreground mt-1 ${isCurrentUser ? "text-right" : ""}`}>
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </div>
        )}
      </div>
    </div>
  );
}
