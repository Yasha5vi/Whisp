import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
  } from "react";
  import axios from "axios";
import { API_URL } from "@/config/urlConfig";
  
  type AuthContextType = {
    user: any;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
  };
  
  const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => {},
    logout: async () => {},
    isLoading: true,
  });
  
  type AuthProviderProps = {
    children: ReactNode;
  };
  
  export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
  
    // Verify the current session by calling the /api/auth/me endpoint.
    const verifySession = async () => {
      try {
        const response = await axios.get(API_URL+"/api/auth/me", {
          withCredentials: true,
        });
        // Expecting a response like: { user: { ... } }
        setUser(response.data.data);
      } catch (error) {
        console.error("Session verification failed:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
  
    // On mount, verify the session.
    useEffect(() => {
      verifySession();
    }, []);
  
    // After a successful login (when your login API sets cookies),
    // this function re-verifies the session.
    const login = async () => {
      setIsLoading(true);
      try {
        await verifySession();
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
  
    // Logout clears the session.
    const logout = async () => {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout, isLoading }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => useContext(AuthContext);
  
  export default AuthContext;
  