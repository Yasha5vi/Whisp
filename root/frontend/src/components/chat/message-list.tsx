import MessageItem from "./message-item"
import TypingIndicator from "./typing-indicator"

interface Message {
  id: string
  type: "sent" | "received" | "typing"
  sender?: string
  avatar?: string
  content?: string
  time?: string
  images?: string[]
}

interface MessageListProps {
  messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => {
        if (message.type === "typing") {
          return <TypingIndicator key={message.id} sender={message.sender || ""} avatar={message.avatar || ""} />
        }

        return (
          <MessageItem
            key={message.id}
            type={message.type}
            sender={message.sender}
            avatar={message.avatar}
            content={message.content}
            time={message.time}
            images={message.images}
          />
        )
      })}
    </div>
  )
}

