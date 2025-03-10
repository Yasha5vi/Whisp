// import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface MessageItemProps {
  type: "sent" | "received"
  sender?: string
  avatar?: string
  content?: string
  time?: string
  images?: string[]
}

export default function MessageItem({ type, sender, avatar, content, time, images }: MessageItemProps) {
  if (type === "received") {
    return (
      <div className="flex items-start gap-2 mb-6">
        <Avatar className="h-8 w-8 mt-1">
          <AvatarImage src={avatar || ""} alt={sender || "User"} />
          <AvatarFallback>{sender?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium">{sender}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
          </div>
          <div className="mt-1">
            <span className="text-gray-600 dark:text-gray-300">{content}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-end gap-2">
      {content && (
        <div className="bg-purple-600 dark:bg-purple-700 rounded-lg p-3 max-w-[80%]">
          <p>{content}</p>
        </div>
      )}

      {images && images.length > 0 && (
        <div className={`grid ${images.length === 1 ? "" : "grid-cols-2"} gap-2 max-w-[80%]`}>
          {images.map((src, index) => (
            <img
              key={index}
              src={src || "/placeholder.svg"}
              width={300}
              height={200}
              alt={`Image ${index + 1}`}
              className={`rounded-lg w-full h-auto object-cover ${
                images.length === 3 && index === 2 ? "col-span-2" : ""
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

