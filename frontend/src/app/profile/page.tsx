"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context/AuthContext";
import { Copy, LogOut, BookOpen, Users } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, loading, logout } = useUser();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  const handleCopyReferralCode = () => {
    if (currentUser?.referralCode) {
      navigator.clipboard.writeText(currentUser.referralCode);
      toast.success("Referral code copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="text-lg font-medium text-muted-foreground animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="text-lg font-medium text-destructive">
          No user logged in.
        </p>
      </div>
    );
  }

  const referredCount = currentUser.referredUsers?.length || 0;
  const convertedCount =
    currentUser.referredUsers?.filter((r) => r.status === "converted").length ||
    0;

  return (
    <div className="min-h-screen bg-background p-6 flex justify-center">
      <Card className="w-full max-w-4xl shadow-sm border border-border rounded-xl bg-card text-card-foreground transition-colors">
        {/* Header */}
        <CardHeader className="p-8 border-b border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 border border-border shadow-sm">
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${currentUser.name}&background=random`}
                />
                <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-semibold capitalize">
                  {currentUser.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {currentUser.email}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="px-3 text-sm font-medium"
                  >
                    Credits: {currentUser.credits}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="px-3 text-sm font-medium"
                  >
                    Referred By: {currentUser.referredBy || "N/A"}
                  </Badge>
                </div>
              </div>
            </div>

            <Button
              variant="destructive"
              onClick={handleLogout}
              className="flex items-center gap-2 shadow-sm hover:opacity-90"
            >
              <LogOut size={18} /> Logout
            </Button>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-8 space-y-10">
          {/* Referral Overview */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Referral Code */}
            <div className="border border-border bg-muted/30 rounded-lg p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground font-medium">
                  Your Referral Code
                </p>
                <Button
                  variant="outline"
                  onClick={handleCopyReferralCode}
                  className="flex items-center gap-2 text-sm"
                >
                  <Copy size={16} /> Copy
                </Button>
              </div>
              <p className="font-semibold text-lg text-foreground tracking-wide">
                {currentUser.referralCode}
              </p>
            </div>

            {/* Referral Stats */}
            <div className="border border-border bg-muted/30 rounded-lg p-5 flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <Users className="text-primary" size={20} />
                <p className="font-semibold text-foreground text-lg">
                  Referral Overview
                </p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Referred
                  </p>
                  <p className="text-2xl font-semibold text-primary">
                    {referredCount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Converted Users
                  </p>
                  <p className="text-2xl font-semibold text-accent">
                    {convertedCount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Purchased Books */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-primary" size={20} />
              <h2 className="text-xl font-semibold text-foreground">
                Purchased Books ({currentUser.products.length})
              </h2>
            </div>

            {currentUser.products.length === 0 ? (
              <p className="text-muted-foreground italic">
                No books purchased yet.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {currentUser.products.map((book) => (
                  <Card
                    key={book._id}
                    className="border border-border shadow-sm hover:shadow-md transition rounded-lg bg-card"
                  >
                    <CardContent className="p-5 flex flex-col justify-between h-full">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground mb-1">
                          {book.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          by {book.author}
                        </p>
                        <p className="text-sm text-muted-foreground/80 line-clamp-3">
                          {book.description}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <p className="font-semibold text-primary">
                          ${book.price}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Purchased:{" "}
                          {book.purchasedAt
                            ? new Date(book.purchasedAt).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
