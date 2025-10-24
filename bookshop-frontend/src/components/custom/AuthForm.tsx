"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/AuthContext";
import { AuthFormProps, AuthType } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function AuthForm({ initialType = "login" }: AuthFormProps) {
  const router = useRouter();
  const [authType, setAuthType] = useState<AuthType>(initialType);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    referredBy: "",
  });

  const { createUser, loginUser } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const user = await loginUser(formData.email, formData.password);

      if (user) {
        toast.success("Login successful!");
        router.push("/profile");
      } else {
        toast.error("Invalid email or password");
      }
    } catch {
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error("Please fill all required fields");
        return;
      }

      const user = await createUser(
        formData.name,
        formData.email,
        formData.password,
        formData.referredBy || undefined
      );

      if (user) {
        toast.success("Signup successful!");
        router.push("/profile");
      } else {
        toast.error("Signup failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authType === "login") {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md rounded-xl shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            {authType === "login" ? "Login" : "Sign Up"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {authType === "signup" && (
              <>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <Label htmlFor="referredBy">Referred By</Label>
                  <Input
                    id="referredBy"
                    name="referredBy"
                    value={formData.referredBy}
                    onChange={handleChange}
                    placeholder="Referral Code"
                  />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-white hover:bg-primary/90 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  {authType === "login" ? "Logging in..." : "Signing up..."}
                </>
              ) : (
                <>{authType === "login" ? "Login" : "Sign Up"}</>
              )}
            </Button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-500">
            {authType === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() =>
                setAuthType(authType === "login" ? "signup" : "login")
              }
              className="text-primary font-semibold underline underline-offset-4 hover:text-primary/80"
            >
              {authType === "login" ? "Sign Up" : "Login"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
