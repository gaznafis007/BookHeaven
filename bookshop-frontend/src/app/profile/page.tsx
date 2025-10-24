"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context/AuthContext";

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
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">Loading profile...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-red-500">No user logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <Card className="w-full max-w-3xl shadow-lg rounded-lg">
        {/* Header */}
        <CardHeader className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-8 pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={`https://ui-avatars.com/api/?name=${currentUser.name}`}
              />
              <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold">
                {currentUser.name}
              </CardTitle>
              <p className="text-gray-500">{currentUser.email}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge className="bg-indigo-600 text-white">
                  Credits: {currentUser.credits}
                </Badge>
                <Badge className="bg-green-600 text-white">
                  Referred By: {currentUser.referredBy || "N/A"}
                </Badge>
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-600 text-white">
                    Referral Code: {currentUser.referralCode}
                  </Badge>
                  <Button size="sm" onClick={handleCopyReferralCode}>
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="self-end md:self-start hover:opacity-90 transition"
          >
            Logout
          </Button>
        </CardHeader>

        <Separator />

        {/* Purchased Books */}
        <CardContent className="mt-4">
          <h2 className="text-xl font-semibold mb-4">
            Purchased Books ({currentUser.products.length})
          </h2>

          {currentUser.products.length === 0 ? (
            <p className="text-gray-500">No books purchased yet.</p>
          ) : (
            <div className="space-y-3">
              {currentUser.products.map((book) => (
                <Card
                  key={book._id}
                  className="border border-gray-200 shadow-sm"
                >
                  <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4">
                    <div>
                      <h3 className="font-semibold">{book.title}</h3>
                      <p className="text-sm text-gray-500">{book.author}</p>
                      <p className="text-sm text-gray-400">
                        {book.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="font-semibold">${book.price}</p>
                      <p className="text-gray-400 text-sm">
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
        </CardContent>
      </Card>
    </div>
  );
}
