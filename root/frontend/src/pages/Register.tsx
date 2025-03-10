import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4 py-8">
      <Card className="w-full max-w-lg border-4 border-border bg-bw shadow-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all my-8">
        <CardHeader className="space-y-2 bg-main p-6 border-b-4 border-border">
          <CardTitle className="text-3xl font-heading text-center text-mtext">Create Account</CardTitle>
          <CardDescription className="text-mtext/80 text-center font-base">
            Fill out the form to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg font-base">Full Name</Label>
            <Input 
              id="name" 
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="h-12 border-2 border-border bg-bg placeholder:text-text/50 focus:translate-x-1 focus:translate-y-1 focus:shadow-none"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg font-base">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="h-12 border-2 border-border bg-bg placeholder:text-text/50 focus:translate-x-1 focus:translate-y-1 focus:shadow-none"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="username" className="text-lg font-base">Username</Label>
            <Input 
              id="username" 
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              className="h-12 border-2 border-border bg-bg placeholder:text-text/50 focus:translate-x-1 focus:translate-y-1 focus:shadow-none"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-lg font-base">Password</Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="h-12 border-2 border-border bg-bg pr-12 placeholder:text-text/50 focus:translate-x-1 focus:translate-y-1 focus:shadow-none"
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-lg font-base">Confirm Password</Label>
            <div className="relative">
              <Input 
                id="confirmPassword" 
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="h-12 border-2 border-border bg-bg pr-12 placeholder:text-text/50 focus:translate-x-1 focus:translate-y-1 focus:shadow-none"
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-2 flex flex-col gap-4">
          <Button 
            type="submit" 
            className="w-full h-12 font-base text-lg bg-main text-mtext border-2 border-border shadow-shadow hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all"
          >
            Create Account <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-center text-text">
            Already have an account?{" "}
            <Link to="/login" className="font-base text-main hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
