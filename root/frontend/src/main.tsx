import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from "@/contexts/authContext";
import { SocketProvider } from "@/contexts/socketContext";
import { FriendsProvider } from "@/contexts/friendContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <FriendsProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </FriendsProvider>
    </AuthProvider>
  </StrictMode>,
);
