"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Code, Filter, MoreVertical, PlusCircle, Search, Share2, Smile, Send, Paperclip } from "lucide-react"

export default function ChatInterface() {
  const [message, setMessage] = useState("")

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Top Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              1
            </span>
          </div>
          <Avatar className="h-8 w-8 border border-gray-700">
            <AvatarImage
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XdjwOvFkzH632OveqGxHxNOELry0qj.png"
              alt="User"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Button className="flex items-center gap-2 bg-transparent hover:bg-gray-800 border border-gray-700 rounded-md">
            <PlusCircle className="w-4 h-4" />
            Create a chat
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Chat List */}
        <div className="w-full max-w-md border-r border-gray-800 flex flex-col">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-800 flex gap-2">
            <div className="relative flex-1">
              <Input type="text" placeholder="Search chat..." className="bg-black border-gray-800 pl-10 w-full" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            </div>
            <Button variant="outline" size="icon" className="border-gray-800">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            <ChatListItem
              avatar="/placeholder.svg?height=40&width=40"
              name="Jane Smith"
              message="Hi there! How are you doing? I'll be around..."
              time="2 hours ago"
              active={true}
            />
            <ChatListItem
              avatar="/placeholder.svg?height=40&width=40"
              name="Bob Johnson"
              message="What's for dinner tonight? I'm craving some"
              time="Yesterday"
            />
            <ChatListItem
              avatar="/placeholder.svg?height=40&width=40"
              name="Emily Davis"
              message="Can you help me with this coding problem?"
              time="2 days ago"
            />
            <ChatListItem
              avatar="/placeholder.svg?height=40&width=40"
              name="Michael Wilson"
              message="See you tomorrow at the park. Don't forget t"
              time="2 weeks ago"
            />
            <ChatListItem
              avatar="/placeholder.svg?height=40&width=40"
              name="Sophia Anderson"
              message="I miss you so much! It's been ages since we l"
              time="2 weeks ago"
            />
            <ChatListItem
              avatar="/placeholder.svg?height=40&width=40"
              name="Liam Brown"
              message="Let's meet up for coffee. I have some excitin"
              time="3 weeks ago"
            />
            <ChatListItem
              avatar="/placeholder.svg?height=40&width=40"
              name="Olivia Lee"
              message="I have some big news! Guess what? I'm getti"
              time="4 weeks ago"
            />
          </div>

          {/* Navigation Bar */}
          <div className="bg-black p-4 border-t border-gray-800 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              <span className="font-bold">DevUI</span>
            </div>
            <nav className="flex gap-6">
              <Link href="#" className="text-sm hover:text-gray-300">
                Home
              </Link>
              <Link href="#" className="text-sm hover:text-gray-300">
                Templates
              </Link>
              <Link href="#" className="text-sm hover:text-gray-300">
                About us
              </Link>
            </nav>
          </div>
        </div>

        {/* Right Side - Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Jane Smith" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <span className="font-medium">Jane smith</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex items-start gap-2 mb-6">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dan Abramov" />
                <AvatarFallback>DA</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Dan Abramov</span>
                  <span className="text-xs text-gray-400">5 minutes ago</span>
                </div>
                <div className="mt-1">
                  <span className="text-gray-300">How's it going on your end? I heard you had a busy week.</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="bg-purple-600 rounded-lg p-3 max-w-[80%]">
                <p>I'm good too, just catching up on some reading and enjoying the weather outside.</p>
              </div>
              <div className="grid grid-cols-2 gap-2 max-w-[80%]">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  width={300}
                  height={200}
                  alt="Image 1"
                  className="rounded-lg w-full h-auto object-cover"
                />
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  width={300}
                  height={200}
                  alt="Image 2"
                  className="rounded-lg w-full h-auto object-cover"
                />
                <Image
                  src="/placeholder.svg?height=200&width=600"
                  width={600}
                  height={200}
                  alt="Image 3"
                  className="rounded-lg w-full h-auto object-cover col-span-2"
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Jane Smith" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">Jane Smith</span>
                <div className="bg-gray-700 rounded-lg p-2 mt-1 inline-block">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-2 bg-gray-900 rounded-lg p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Input
                type="text"
                placeholder="Message..."
                className="bg-transparent border-0 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Smile className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Button size="icon" className="bg-purple-600 hover:bg-purple-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ChatListItemProps {
  avatar: string
  name: string
  message: string
  time: string
  active?: boolean
}

function ChatListItem({ avatar, name, message, time, active = false }: ChatListItemProps) {
  return (
    <div className={`flex items-start gap-3 p-4 hover:bg-gray-900 cursor-pointer ${active ? "bg-gray-900" : ""}`}>
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className="font-medium">{name}</span>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
        <p className="text-sm text-gray-400 truncate">{message}</p>
      </div>
    </div>
  )
}

