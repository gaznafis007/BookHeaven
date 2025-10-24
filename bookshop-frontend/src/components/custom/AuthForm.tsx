"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AuthType = "login" | "signup";

interface AuthFormProps {
  initialType?: AuthType;
}

export function AuthForm({ initialType = "login" }: AuthFormProps) {
  const [authType, setAuthType] = useState<AuthType>(initialType);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    referredBy: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    console.log({ email: formData.email, password: formData.password });
  };

  const handleSignup = () => {
    console.log({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      referredBy: formData.referredBy,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authType === "login" ? handleLogin() : handleSignup();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
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
                  <Label htmlFor="name" className="font-medium text-gray-700">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="mt-1 focus:ring-2 focus:ring-primary/70 transition rounded-md"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="referredBy"
                    className="font-medium text-gray-700"
                  >
                    Referred By
                  </Label>
                  <Input
                    id="referredBy"
                    name="referredBy"
                    value={formData.referredBy}
                    onChange={handleChange}
                    placeholder="Referral Code"
                    className="mt-1 focus:ring-2 focus:ring-primary/70 transition rounded-md"
                  />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="email" className="font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-1 focus:ring-2 focus:ring-primary/70 transition rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="password" className="font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="mt-1 focus:ring-2 focus:ring-primary/70 transition rounded-md"
              />
            </div>
            <Button
              type="submit"
              className="w-full py-3 bg-primary text-white font-semibold hover:bg-primary/90 transition rounded-lg"
            >
              {authType === "login" ? "Login" : "Sign Up"}
            </Button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-500">
            {authType === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <a
              href={authType === "login" ? "/signup" : "/login"}
              className="text-primary font-semibold underline underline-offset-4 hover:text-primary/80 transition-colors"
            >
              {authType === "login" ? "Sign Up" : "Login"}
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
