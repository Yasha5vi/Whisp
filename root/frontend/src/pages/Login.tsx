import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")

  const togglePassword = () => setShowPassword(!showPassword)

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
            <Label htmlFor="identifier" className="text-lg font-base">Email or Username</Label>
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
            <Label htmlFor="password" className="text-lg font-base">Password</Label>
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
  )
}
