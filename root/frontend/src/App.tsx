import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import ChatLayout from "@/layouts/chat/chat-layout"
import Chat from "./pages/Chat"
import Landing from "./pages/Landing"

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<div className="p-12 text-center">Forgot Password Page (Coming Soon)</div>} />
        
        {/* Chat routes */}
        <Route path="/chat" element={<ChatLayout />}>
          <Route index element={<Chat />} />
          <Route path=":id" element={<Chat />} />
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/chat" replace />} />

        
        {/* Default redirects */}
        <Route path="/" element={<Navigate to="/chat" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}
