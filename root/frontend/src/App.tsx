import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ChatLayout from "./components/chat/chat-layout"
import { Button } from "./components/ui/button"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Button>Click me</Button>} />
        <Route path="/chat" element={<ChatLayout />} />
      </Routes>
    </Router>
  )
}

export default App
