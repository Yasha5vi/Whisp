import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useAuth } from "@/contexts/authContext";
import { API_URL } from "@/config/urlConfig";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // using cookie‑based auth so login() will verify session

  const togglePassword = () => setShowPassword(!showPassword);

  const handleClick = async () => {
    try {
      let username = "";
      let email = "";
      if (identifier.includes("@gmail.com")) {
        email = identifier;
      } else {
        username = identifier;
      }
      // Post credentials to the login API.
      // Ensure that withCredentials is true so that cookies are set.
      await axios.post(
        API_URL+"/api/users/login",
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      await login();
      // console.log("here");
      navigate("/chat");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || "Something went wrong";
        setMessage(msg);
        console.error("Request failed:", err.response?.data?.message || err.message);
      } else {
        console.error("An unexpected error occurred:", err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <Card className="w-full max-w-md border-4 border-border bg-bw shadow-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
        <CardHeader className="space-y-2 bg-main p-6 border-b-4 border-border">
          <CardTitle className="text-3xl font-heading text-center text-mtext">Login</CardTitle>
          <CardDescription className="text-mtext/80 text-center font-base">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="identifier" className="text-lg font-base">
              Email or Username
            </Label>
            <Input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter your email or username"
              className="h-12 border-2 border-border bg-bg placeholder:text-text/50 focus:translate-x-1 focus:translate-y-1 focus:shadow-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-lg font-base">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-12 border-2 border-border bg-bg pr-12 placeholder:text-text/50 focus:translate-x-1 focus:translate-y-1 focus:shadow-none"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={togglePassword}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
            <p>{message}</p>
          </div>
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm font-base hover:underline text-main">
              Forgot password?
            </Link>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full h-12 font-base text-lg bg-main text-mtext border-2 border-border shadow-shadow hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all"
            onClick={handleClick}
          >
            Sign In <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-center text-text">
            Don't have an account?{" "}
            <Link to="/register" className="font-base text-main hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
